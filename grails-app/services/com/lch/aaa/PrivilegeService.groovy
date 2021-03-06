package com.lch.aaa

import grails.transaction.Transactional
import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

// @Transactional(readOnly = true)
class PrivilegeService {

    List<Privilege> listByRoles(List roleIds) {
        return Privilege.where {
          role.id in (roleIds ?: [])
        }.list()
    }

	// @Cacheable('privilege')
	List<Privilege> list(Map params) {
        return Privilege.where {
            if (params?.roleId) {
                role.id == "${params.roleId}"
                // role {
                //     id == "${params.roleId}"
                // }
                // params.remove('roleId')
            }
            if (params?.functionId) {
                function.id == "${params.functionId}"
                // function {
                //     id == "${params.functionId}"
                // }
                // params.remove('functionId')
            }
        }.list{ // (params)
			if (params?.max) { max(params.max) }
			if (params?.offset) { offset(params.offset as int) }
			if (params?.sort) {
				order(
					(params.sort=='id' ? 'role.id' : params.sort),
					(params?.order ? params.order : 'asc')
				)
				if (! params?.sort.startsWith('function')) {
					order('function.description')
				}
			}
		}
	}

	@Transactional
	// @CachePut(value = 'privilege', key = '#privilege.id')
	void save(Privilege privilege) {
		privilege.save flush: true
	}

	@Transactional
	// @CacheEvict(value = 'privilege', key = '#privilege.id')
	void delete(Privilege privilege) {
		privilege.delete flush: true
	}
}
