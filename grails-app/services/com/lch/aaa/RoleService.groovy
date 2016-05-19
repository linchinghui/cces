package com.lch.aaa

import grails.transaction.Transactional
import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

// @Transactional(readOnly = true)
class RoleService {

	@Cacheable('role')
	Role get(String id) {
		return Role.get(DefaultRoleType.salvage(id).id)
	}

	@Transactional
	@CachePut(value = 'role', key = '#role.id')
	void save(Role role) {
		role.save flush: true
	}

	@Transactional
	@CacheEvict(value = 'role', key = '#role.id')
	void delete(Role role) {
		role.delete flush: true
	}
}
