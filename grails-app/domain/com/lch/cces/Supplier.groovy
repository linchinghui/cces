package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/suppliers', superClass = SupplierController)
class Supplier {

	String				id				// primary key, 一律小寫
	String				code			// 供應商代碼, alias of id
	String				name			// 供應商名稱
	String				ubn				// (商業司)統一編號
	String				phoneNo			// 電話
	String				faxNo			// 傳真電話
	String				email			// 電子郵件信箱
	String				contact			// 聯絡人
	String				contactPhoneNo	// 聯絡電號
	// @BindingFormat("yyyy/MM/dd'Z'")
	// Date				registeredDate	// 登錄日期
	// @BindingFormat("yyyy/MM/dd'Z'")
	// Date				createdDate		// 建檔日期

	static constraints = {
		code			blank: false, nullable: false, maxSize: 10 //, unique: true // PK is unique already
		name			blank: false, nullable: false, maxSize: 40
		ubn				blank: false, nullable: false, maxSize: 8
		phoneNo			blank: true, nullable: true, maxSize: 12
		faxNo			blank: true, nullable: true, maxSize: 12
		email			blank: true, nullable: true, maxSize: 40
		contact			blank: true, nullable: true, maxSize: 10
		contactPhoneNo	blank: true, nullable: true, maxSize: 12
		// registeredDate	blank: false, nullable: false
		// createdDate		blank: false, nullable: false
	}

	static mapping = {
		version			false
		sort			'id'

		id				generator: 'assigned', name: 'code'
	}

	String getCode() {
		this.id
	}
	void setCode(String code) {
		this.id = code?.toLowerCase()
	}

	// def beforeInsert() {
	// 	if (registeredDate == null) {
	// 		registeredDate = new Date()
	// 	}
	//
	// 	if (createdDate == null) {
	// 		createdDate = new Date()
	// 	}
	// 	createdDate.clearTime()
	// }

	public String toString() {
		"${name}"
	}
}
