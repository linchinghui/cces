package com.lch.cces

import grails.transaction.Transactional
import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

// @Transactional(readOnly = true)
class MaterialCategoryService {

	// @Cacheable('materialCategory')
	MaterialCategory get(String id) {
		return MaterialCategory.get(id?.toLowerCase())
	}

	@Transactional
	// @CachePut(value = 'materialCategory', key = '#materialCategory.id')
	void save(MaterialCategory materialCategory) {
		materialCategory.save flush: true
	}

	@Transactional
	// @CacheEvict(value = 'materialCategory', key = '#materialCategory.id')
	void delete(MaterialCategory materialCategory) {
		materialCategory.delete flush: true
	}
}
