package com.lch.aaa

import grails.transaction.Transactional
import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

class PrivilegeService {

	@Transactional(readOnly = true)
	@Cacheable('privilege')
	List<Privilege> list(Map params) {
        return Privilege.where {
            if (params?.roleId != null) {
                role.id == "${params.roleId}"
                // role {
                //     id == "${params.roleId}"
                // }
                // params.remove('roleId')
            }
            if (params?.functionId != null) {
                function.id == "${params.functionId}"
                // function {
                //     id == "${params.functionId}"
                // }
                // params.remove('functionId')
            }
        }.list(params)
	}

	@Transactional
	@CachePut(value = 'privilege', key = '#privilege.id')
	void save(Privilege privilege) {
		privilege.save flush: true
	}

	@Transactional
	@CacheEvict(value = 'privilege', key = '#privilege.id')
	void delete(Privilege privilege) {
		privilege.delete flush: true
	}
}
