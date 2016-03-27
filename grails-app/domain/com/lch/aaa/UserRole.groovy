package com.lch.aaa

class UserRole implements Serializable {

	User	user
	Role	role
	
    static constraints = {
    }
	
	static mapping = {
		id		composite: ['user', 'role']
		version	false
	}
}
