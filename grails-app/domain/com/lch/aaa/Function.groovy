package com.lch.aaa

import grails.rest.Resource

@Resource(uri = '/api/functions', superClass = FunctionController)
class Function {

	String			id				// primary key, 一律小寫
	String			name			// 作業代碼, alias of id
	String			description		// 作業名稱
	Boolean			aided = false	// 輔助型作業

	static constraints = {
		name		blank: false, nullable: false, maxSize: 20, unique: true
		description	blank: false, nullable: false, maxSize: 100
		aided		blank: true, nullable: true
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
		this.id = name?.toLowerCase()
	}

	public String toString() {
		"${description}"
	}
}
