package com.lch.cces

import grails.transaction.Transactional
import grails.plugin.cache.Cacheable
import grails.plugin.cache.CachePut
import grails.plugin.cache.CacheEvict

// @Transactional(readOnly = true)
class VehicleBrandService {

	// @Cacheable('vehicleBrand')
	VehicleBrand get(String id) {
		return VehicleBrand.get(id?.toUpperCase())
	}

	@Transactional
	// @CachePut(value = 'vehicleBrand', key = '#vehicleBrand.id')
	void save(VehicleBrand vehicleBrand) {
		vehicleBrand.save flush: true
	}

	@Transactional
	// @CacheEvict(value = 'vehicleBrand', key = '#vehicleBrand.id')
	void delete(VehicleBrand vehicleBrand) {
		vehicleBrand.delete flush: true
	}
}
