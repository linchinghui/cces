package com.lch.aaa

class RoleController extends BaseController<Role> {

    static namespace = Application.NAMESPACE_API

    def roleService

    RoleController() {
        super(Role)
    }

    protected final Role queryForResource(id) {
    	return roleService.get(id)
    }

    protected final Role saveResource(Role role) {
        return roleService.save(role)
    }

    protected final deleteResource(Role role) {
        roleService.delete(role)
    }

}
