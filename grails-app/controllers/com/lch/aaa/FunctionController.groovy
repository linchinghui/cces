package com.lch.aaa

import static Application.NAMESPACE_API

class FunctionController extends BaseController<Function> {

    static namespace = NAMESPACE_API

    def functionService

    FunctionController() {
        super(Function)
    }

    protected final Function queryForResource(id) {
    	return functionService.get(id)
    }

    protected final Function saveResource(Function function) {
        return functionService.save(function)
    }

    protected final deleteResource(Function function) {
        functionService.delete(function)
    }

}
