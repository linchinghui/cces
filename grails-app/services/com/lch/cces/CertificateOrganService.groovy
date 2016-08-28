package com.lch.cces

import grails.transaction.Transactional
import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

// @Transactional(readOnly = true)
class CertificateOrganService {

	// @Cacheable('certificateOrgan')
	CertificateOrgan get(String id) {
		return CertificateOrgan.get(id?.toLowerCase())
	}

	@Transactional
	// @CachePut(value = 'certificateOrgan', key = '#certificateOrgan.id')
	void save(CertificateOrgan certificateOrgan) {
		certificateOrgan.save flush: true
	}

	@Transactional
	// @CacheEvict(value = 'certificateOrgan', key = '#certificateOrgan.id')
	void delete(CertificateOrgan certificateOrgan) {
		certificateOrgan.delete flush: true
	}
}
