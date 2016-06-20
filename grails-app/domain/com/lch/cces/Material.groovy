package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/materials', superClass = MaterialController)
class Material {

	MaterialCategory	category		// 材料頪別
	String				name			// 材料名稱
	String				dimension		// 尺寸
	String				texture			// 材質
	String				spec			// (原:規格)其他
	String				unit			// 單位
	Integer				quantity		// 數量
	BigDecimal			price			// 價格

	// static hasMany = [suppliers: Supplier]

	// String			supplier		// 供應商
	// String			contactPhoneNo	// 聯絡電號
	// @BindingFormat("yyyy/MM/dd'Z'")
	// Date				registeredDate	// 登錄日期

	static constraints = {
		category		blank: false, nullable: false
		name			blank: false, nullable: false, maxSize: 20 // 2016-06-06 commented: , unique: true
		dimension		blank: true, nullable: true, maxSize: 100
		texture			blank: true, nullable: true, maxSize: 100
		spec			blank: true, nullable: true, maxSize: 100
		unit			blank: true, nullable: true, maxSize: 10
		quantity		blank: false, nullable: false, size: 0..99999, min: 0
		price			blank: true, nullable: true, size: 0..999999, min: BigDecimal.ZERO

		// suppliers		joinTable: [key: 'material_id', column: 'supplier_id'], lazy: true // false

		// supplier		blank: true, nullable: true, maxSize: 40
		// contactPhoneNo	blank: true, nullable: true, maxSize: 12
		// registeredDate	blank: false, nullable: false
	}

	static mapping = {
		version			false
		sort			'id'
	}

	// def beforeInsert() {
	// 	if (registeredDate == null) {
	// 		registeredDate = new Date()
	// 	}
	// }

	public String toString() {
		"${name}"
	}

}
