package com.lch.cces

import grails.rest.Resource

@Resource(uri = '/api/vehicleBrands', superClass = VehicleBrandController)
class VehicleBrand {

	String			id			// primary key, 一律大寫
	String			name		// 廠牌代碼, alias of id
	String			description	// 廠牌名稱

	static constraints = {
		name		blank: false, nullable: false, maxSize: 20, unique: true
		description	blank: false, nullable: false, maxSize: 40
	}

	static mapping = {
		version		false
		sort		'id'
		//cache		usage: 'read-only', include: 'non-lazy'
		cache		usage: 'read-write'

		id			generator: 'assigned', name: 'name'
	}

	String getName() {
		this.id
	}
	void setName(String name) {
		this.id = name?.toUpperCase()
	}

	public String toString() {
		"${description}"
	}

}
