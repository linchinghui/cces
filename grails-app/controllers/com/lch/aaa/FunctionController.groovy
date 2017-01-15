package com.lch.aaa

import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

class FunctionController extends BaseController<Function> {

    static namespace = Application.NAMESPACE_API

    def functionService

	FunctionController() {
        super(Function)
    }

    @Cacheable('function')
    protected final Function queryForResource(id) {
    	// return functionService.get(id)
      return Function.get(id?.toLowerCase())
    }

	@CachePut(value = 'function', key = '#function.id')
    protected final Function saveResource(Function function) {
        // return functionService.save(function)
        function.save flush: true
    }

	@CacheEvict(value = 'function', key = '#function.id')
    protected final deleteResource(Function function) {
        // functionService.delete(function)
        function.delete flush: true
    }

}
