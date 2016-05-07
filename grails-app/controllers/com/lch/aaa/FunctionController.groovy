package com.lch.aaa

class FunctionController extends BaseController<Function> {

    static namespace = Application.NAMESPACE_API

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
