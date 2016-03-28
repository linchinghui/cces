package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/vehicles', superClass = VehicleController)
class Vehicle {

	String			id				// primary key, 一律大寫
	String			plateNo			// 車號, alias of id
	VehicleBrand	brand			// 廠牌
	String			model			// 型號
	@BindingFormat("yyyy/MM/dd'Z'")
	Date			inspectedDate	// 驗車日期
	String			note			// 備註

	static constraints = {
		plateNo			blank: false, nullable: false, maxSize: 10, unique: true //, validator: { val, obj ->
		// 	val in ['A','B']
		// }
		brand			blank: false, nullable: false
		model			blank: true, nullable: true, maxSize: 40
		inspectedDate	blank: true, nullable: true
		note			blank: true, nullable: true, maxSize: 100
	}

	static mapping = {
		version			false

		id				generator: 'assigned', name: 'plateNo'
	}

	
	String getPlateNo() {
		this.id
	}
	void setPlateNo(String no) {
		this.id = no?.toUpperCase()
	}

	public String toString() {
		"${plateNo}"
	}
}
