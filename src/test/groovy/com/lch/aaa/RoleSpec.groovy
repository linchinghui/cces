package com.lch.aaa

import com.lch.aaa.DefaultRoleType;
import com.lch.aaa.Role;

import grails.test.mixin.TestFor
import grails.test.mixin.domain.DomainClassUnitTestMixin
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */

@TestFor(Role)

//@Domain(Person)
//@TestMixin(HibernateTestMixin)

//@TestMixin(DomainClassUnitTestMixin)
class RoleSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }
	
	void "Role::getType()"() {
		expect:
			new Role(code: code).getType() == type
		
		where:
			code				| type
			'x'					| DefaultRoleType.ROLE_USER
			'ROLE_x'			| DefaultRoleType.ROLE_USER
			'ROLE_USER'			| DefaultRoleType.ROLE_USER
			'ROLE_SUPERVISOR'	| DefaultRoleType.ROLE_SUPERVISOR
			'ROLE_FILING'		| DefaultRoleType.ROLE_FILING
	}

   void "Role::save(failOnError)"() {
   		when:
			new Role(code: 'abc', description: 'ABC').save(failOnError: true)
		then:
			notThrown()
   }

}
