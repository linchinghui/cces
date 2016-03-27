package com.lch.aaa

import grails.transaction.Transactional
import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

class FunctionService {

	@Transactional(readOnly = true)
	@Cacheable('function')
	Function get(String id) {
		return Function.get(id?.toLowerCase())
	}

	@Transactional
	@CachePut(value = 'function', key = '#function.id')
	void save(Function function) {
		function.save flush: true
	}

	@Transactional
	@CacheEvict(value = 'function', key = '#function.id')
	void delete(Function function) {
		function.delete flush: true
	}
}
