package com.lch.aaa

import static com.lch.aaa.DefaultRoleType.*
import spock.lang.Specification


class RoleTypeSpec extends Specification {

    def setup() {
    }

    def cleanup() {
	}

	/*
	 * valueOf()
	 */
    void "DefaultRoleType::valueOf()"() {
		expect:
			DefaultRoleType.valueOf(code) == type
		where:
			code				| type
			'ROLE_USER'			| ROLE_USER
			'ROLE_FILING'		| ROLE_FILING
			'ROLE_SUPERVISOR'	| ROLE_SUPERVISOR
	}
	
	/*
	 * string-as
	 */
	void "DefaultRoleType::string-as"() {
		expect:
			(code as DefaultRoleType) == type
		where:
			code				| type
			'ROLE_USER'			| ROLE_USER
			'ROLE_FILING'		| ROLE_FILING
			'ROLE_SUPERVISOR'	| ROLE_SUPERVISOR
	}

	/*
	 * salvage(Role)
	 */
	void "DefaultRoleType::salvage(Role)"() {
		expect:
//			DefaultRoleType.salvage(Role.get(code)) == type
			DefaultRoleType.salvage(new Role(code: code)) == type
		where:
			code				| type
			'ROLE_USER'			| ROLE_USER
			'ROLE_FILING'		| ROLE_FILING
			'ROLE_SUPERVISOR'	| ROLE_SUPERVISOR
			'ROLE_X'			| ROLE_USER
			'X'					| ROLE_USER
	}
	
	/*
	 * salvage(var)
	 */
	void "DefaultRoleType::salvage(var)"() {
		expect:
			DefaultRoleType.salvage(code) == type
			
		where:
			code				| type
			-1					| ROLE_USER
			0					| ROLE_USER
			1					| ROLE_FILING
			2					| ROLE_SUPERVISOR
			3					| ROLE_USER
			'X'					| ROLE_USER
			'U'					| ROLE_USER
			'F'					| ROLE_FILING
			'S'					| ROLE_SUPERVISOR
			'ROLE'				| ROLE_USER
			'ROLE_USER'			| ROLE_USER
			'ROLE_FILING'		| ROLE_FILING
			'ROLE_SUPERVISOR'	| ROLE_SUPERVISOR
	}

	/*
	 * getId()
	 */
    void "DefaultRoleType::getId()"() {
        expect:
// slower?:
//			role.getId() == code 
			role.id == code
			
        where:
			role				| code
			ROLE_USER			| 'U'
			ROLE_FILING			| 'F'
			ROLE_SUPERVISOR		| 'S'
    }

}
