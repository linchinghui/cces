package com.lch.cces

import grails.transaction.Transactional
import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

// @Transactional(readOnly = true)
class CertificateCategoryService {

	// @Cacheable('certificateCategory')
	CertificateCategory get(String id) {
		return CertificateCategory.get(id?.toLowerCase())
	}

	@Transactional
	// @CachePut(value = 'certificateCategory', key = '#certificateCategory.id')
	void save(CertificateCategory certificateCategory) {
		certificateCategory.save flush: true
	}

	@Transactional
	// @CacheEvict(value = 'certificateCategory', key = '#certificateCategory.id')
	void delete(CertificateCategory certificateCategory) {
		certificateCategory.delete flush: true
	}
}
