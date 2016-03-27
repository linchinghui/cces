package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/projects', superClass = ProjectController)
class Project {

	String			id				// primary key, 一律小寫
	String			code			// 專案代碼, alias of id
	String			description		// 專案名稱 | 機台型號
	String			constructNo		// 序號
	String			constructPlace	// 工程地點
	String			constructCode	// 施作方式
	ConstructType	constructType	// 施作方式 (input/display)
	@BindingFormat("yyyy/MM/dd")
	Date			durationBegin	// 期程-開始
	@BindingFormat("yyyy/MM/dd")
	Date			durationEnd		// 期程-結束
	String			contact			// 合約 | 委外編號
	String			customer		// 甲方
	String			contactPerson	// 聯絡人
	String			contactPhoneNo	// 手機
	String			note			// 備註
	
	static transients = ['constructType']

    static constraints = {
    	code			blank: false, nullable: false, maxSize: 10, unique: true
		description		blank: false, nullable: false, maxSize: 40
		constructNo		blank: true, nullable: true, maxSize: 20
		constructPlace	blank: false, nullable: false, maxSize: 40
		constructCode	blank: false, nullable: false, inList: ConstructType*.id
//		constructType	blank: false, nullable: false
		durationBegin	blank: true, nullable: true
		durationEnd		blank: true, nullable: true
		contact			blank: true, nullable: true, maxSize: 36
		customer		blank: true, nullable: true, maxSize: 40
		contactPerson	blank: true, nullable: true, maxSize: 40
		contactPhoneNo	blank: true, nullable: true, maxSize: 12
		note			blank: true, nullable: true, maxSize: 255
    }

	static mapping = {
		version			false
		sort			'id'

		id				generator: 'assigned', name: 'code'
//		constructCode	column: 'construct_type'
		constructCode	name: 'constructType'
	}

	String getCode() {
		this.id
	}
	void setCode(String code) {
		this.id = code?.toLowerCase()
	}

	ConstructType getConstructType() {
		constructCode ? ConstructType.salvage(constructCode) : null
	}
	void setConstructType(ConstructType type) {
		constructCode = type?.id
	}

	public String toString() {
		"${description}"
	}
}
