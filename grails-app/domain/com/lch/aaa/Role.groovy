package com.lch.aaa

import grails.rest.Resource

@Resource(uri = '/api/roles', superClass = RoleController)
class Role implements Comparable<Role> {

	String			id			// 縮寫
	String			code		// 角色代碼, alias of id
	DefaultRoleType	type		// 系統對應色角
	String			description	// 角色名稱

	static transients = ['type']

	static hasMany = [privileges: Privilege]

	static constraints = {
		code		blank: false, nullable: false, maxSize: 12, unique: true
		description	blank: false, nullable: false, maxSize: 10
	}

	static mapping = {
		version		false
		sort		'id'
		//cache		usage: 'read-only', include: 'non-lazy'
		cache		usage: 'read-write'

		id			generator: 'assigned', name: 'code' // let code to be transient
//		privileges	joinTable: [key: 'role_id', column: 'function_id'], lazy: true // false
//		privileges	joinTable: [name: 'privilege', key: 'role_id', column: 'function_id'], lazy: true // false
		privileges	joinTable: false, column: 'role_id', lazy: true // false
	}

	// static List<Role> listRegistered() {
	// 	return Role.where {
	// 		//code in DefaultRoleType.values()*.name()
	// 		type in DefaultRoleType.values()*.name()
	// 	}.list()
	// }

// testing: something wrong?
//	public static Role get(def id) {
//		try {
//			return load(shortenedCode(id))
//		} catch (e) {
//			// nothing to do
//		}
//		return null
//	}

	private static shortenedCode(code) {
		//return code?.toUpperCase().split(DefaultRoleType.PREFIX)[-1][0].toUpperCase()
		DefaultRoleType.salvage(code).id
	}


//	String getId() {
//		this.id
//	}
//	void setId(String id) {
//		setCode(id)
//	}

	String getCode() {
		this.id
	}
	void setCode(String code) {
		this.id = shortenedCode(code)
	}

	DefaultRoleType getType() {
		type ?: (type = DefaultRoleType.salvage(this.id))
	}

	public String toString() {
		"${description}"
	}

	public int compareTo(def other) {
		return id <=> other?.id
	}
}
