package com.lch.aaa

import static Application.NAMESPACE_API

class PrivilegeController extends BaseController<Privilege> {

	static namespace = NAMESPACE_API

    def privilegeService

	PrivilegeController() {
		super(Privilege)
	}

    protected final Privilege queryForResource(Serializable id) {
        listAllPrivileges(params)[0]
    }

    protected final Privilege saveResource(Privilege privilege) {
        return privilegeService.save(privilege)
    }

    protected final deleteResource(Privilege privilege) {
        privilegeService.delete(privilege)
    }

    private void resolveParameters(params) {
        if (params?.embed == 'true') { // list all
            params.remove('max')
        }

        def compIds = params?.id?.split('\\|')

        if (compIds?.size() >= 1) {
            if (compIds[0] != 'null') {
                if (params?.roleId == null) {
                    params['roleId'] = compIds[0]
                }

            } else {
                params.remove('id') // to identify 'CREATE'
            }

            if (compIds?.size() >= 2) {
                params['functionId'] = compIds[1]
            }
        }
    }

    private List<Privilege> listAllPrivileges(Map params) {
        resolveParameters(params)
        privilegeService.list(params)
    }

    protected final List<Privilege> listAllResources(Map params) {
        def privileges = listAllPrivileges(params)
        def nonPrivileges = null

        if (params?.embed == 'true') { // list all
            def theRole = params?.roleId ? Role.get(params.roleId) : null

            nonPrivileges = Function.where {
                def func = Function
                not {
                    exists Privilege.where {
                        // return role.id == theRole?.id && function.id == func.id
                        role.id == theRole?.id
                        function.id == func.id
                    }.id()
                }
            }.collect {
                new Privilege(role: null/*theRole*/, function: it, canRead:/*true*/false, canWrite: false)
            }
        }

        if (nonPrivileges) {
            privileges += nonPrivileges
        }

        /*return*/ privileges
    }

    protected final Privilege createResource(Map params) {
        resolveParameters(params)
        def props = params

        if (params?.roleId) {
            props.role = Role.get(params.roleId)
            props.remove('roleId')
        }

        if (params?.functionId) {
            props.function = Function.get(params.functionId)
            props.remove('functionId')
        }

        return resource.newInstance(props)
    }

    protected final Privilege createResource() {
        return createResource(params)
    }

    def edit() {
        resolveParameters(params)

        // if (params?.roleId && params?.functionId) {
        if (params?.id) { // CREATE
            super.edit()

        } else {
            redirect action: 'create', params: params
        }
    }

}