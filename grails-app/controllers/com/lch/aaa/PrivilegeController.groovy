package com.lch.aaa

class PrivilegeController extends BaseController<Privilege> {

	static namespace = Application.NAMESPACE_API

    def privilegeService

	PrivilegeController() {
		super(Privilege)
	}

    private void resolveParameters(params) {
        // def compIds = params?.id?.split('\\|')
		//
        // if (compIds?.size() >= 1) {
        //     if (compIds[0] != 'null') {
        //         if (params?.roleId == null) {
        //             params['roleId'] = compIds[0]
        //         }
        //     } else {
        //         params.remove('id') // to identify 'CREATE'
        //     }
		//
        //     if (compIds?.size() >= 2 && compIds[1] != 'null' && params?.functionId == null) {
        //         params['functionId'] = compIds[1]
        //     }
        // }
		params?.id?.split('\\|')?.eachWithIndex { fld, idx ->
			if (fld != 'null') {
				def fldName = idx == 0 ? 'roleId' : 'functionId'; // == 1
				if (params?."$fldName" == null) {
					params[fldName] = fld
				}
			} else {
				params.remove('id') // to identify 'CREATE'
			}
		}
    }

    private List<Privilege> listAllPrivileges(Map params) {
        if (params?.embed == 'true') { // list all
            params.remove('max')
            params.remove('offset')
        }
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
			}.list {
				order('description')
            }.collect {
                new Privilege(role: null/*theRole*/, function: it, canRead:false, canWrite: false)
            }
        }

        if (nonPrivileges) {
            privileges += nonPrivileges
        }

        return privileges
    }

    protected final Privilege queryForResource(Serializable id) {
        listAllPrivileges(params)[0]
    }

    protected final Privilege createResource(Map params) {
        resolveParameters(params)
        def props = params

        if (params?.roleId &&
            params?.roleId != 'null') {
            props.role = Role.get(params.roleId)
            props.remove('roleId')
        }
        if (params?.functionId &&
            params?.functionId != 'null') {
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

        if (params?.id) {
            super.edit()

        } else {
            // redirect action: 'create', params: params
			def url = g.createLink action: 'create', params: params
            redirect url: url
        }
    }

    protected final Privilege saveResource(Privilege privilege) {
        return privilegeService.save(privilege)
    }

    protected final deleteResource(Privilege privilege) {
        privilegeService.delete(privilege)
    }

}
