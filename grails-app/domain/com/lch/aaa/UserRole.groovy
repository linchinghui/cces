package com.lch.aaa

class UserRole implements Serializable {

	User		user
	Role		role

    static constraints = {
    }

	static mapping = {
		version	false
		
		id		composite: ['user', 'role']
	}
}
