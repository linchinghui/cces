package com.lch.aaa

import grails.rest.Resource
import grails.util.Holders

@Resource(uri = '/api/users', superClass = UserController)
class User {

	String			id					// primary key, 一律小寫
	String			username			// 使用者, alias of id
	String			fullname			// 未賦值, 預設同 id, 但為大寫
	String			password
	Boolean			enabled = true		// 可登入
	Boolean			accountLocked		// 鎖住
	Boolean			accountExpired		// 停用
	Boolean			credentialsExpired	// 密碼過期

	static hasMany = [roles: Role]

	static constraints = {
		username	blank: false, nullable: false, maxSize: 10, unique: true
		fullname	blank: true, nullable: true, maxSize: 10
		password	blank: false, nullable: false, maxSize: 250
	}

	static mapping = {
		version		false
		sort		'id'

		id			generator: 'assigned', name: 'username'
		username	column: 'emp_id'
		fullname	column: 'name'
		password	column: '`password`'
		roles		joinTable: [key: 'user_id', column: 'role_id'], lazy: true // false
	}

	// String getId() {
	// 	this.id
	// }
	// void setId(String id) {
	// 	setUsername(id)
	// }

	String getUsername() {
		this.id
	}
	void setUsername(String name) {
		this.id = name?.toLowerCase()
	}

	def beforeInsert() {
//		if (password != null) {
			encodePassword()
//		}
		if (fullname == null) {
			fullname = getUsername().toUpperCase()
		}
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		try {
			password = Holders.applicationContext.passwordEncoder?.encode(password)
		} catch (e) {
			// nothing to do
		}
	}

	public String toString() {
		"${fullname}"
	}
}
