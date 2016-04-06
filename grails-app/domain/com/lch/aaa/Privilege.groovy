package com.lch.aaa

import java.io.Serializable;
import grails.rest.Resource

@Resource(uri = '/api/privileges', superClass = PrivilegeController)
class Privilege implements Serializable, Comparable<Privilege> {

	Role		role
	Function	function
	Boolean		canRead = false
	Boolean		canWrite = false
	Boolean		canDelete = false
	
	static mapping = {
		version		false
		//sort		'id'
		//cache		usage: 'read-only', include: 'non-lazy'
		cache		usage: 'read-write'

		id			composite: ['role', 'function']
	}

	static constraints = {
		role		blank: false, nullable: false
		function	blank: false, nullable: false
	}

	public String getId() {
		"${role?.id}|${function?.id}"
	}
	// public void setId(String _id) {
	// }

	public String toString() {
		"${role?.id}-${function?.name}(${canRead?'r':''}${canWrite?'w':''}${canDelete?'d':''})"
	}

	public int compareTo(def other) {
		return roleId <=> other?.roleId ?: functionId <=> other?.functionId
	}
}
