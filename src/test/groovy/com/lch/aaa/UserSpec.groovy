package com.lch.aaa

import grails.test.mixin.TestFor
import grails.test.mixin.domain.DomainClassUnitTestMixin
import grails.validation.ValidationException

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder

import com.lch.aaa.User;

import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */

@TestFor(User)
class UserSpec extends Specification {
	
	@Autowired
	PasswordEncoder passwordEncoder

    def setup() {
    }

    def cleanup() {
    }

    void "User::validate"() {
		when: 'User::create witout username'
			def u = new User(password: 'abc')
			
		then: 'validation should fail'
			!u.validate()
    }

	void "User::save() failed"() {
		when: 'User::save() witout username'
			new User(password: 'abc').save(flush: true)

		then: 'save should fail'
			thrown(ValidationException)
    }

	void "User::save(failOnError: false)"() {
		when: 'User::save(failOnError: false)'
			new User(password: 'abc').save(failOnError: false)
		then:
			notThrown()
    }
	
    void "User::name"() {
		expect:
			new User(username: user, password: user).id == name
		
		where:
			user		| name
			'ADMIN'		| 'admin'
			'USER'		| 'user'
    }
	
//    void "User::getPassword()"() {
//		expect:
//			new User(name: 'admin', password: rawPassword).password == encodedPassword
//		
//		where:
//			rawPassword		| encodedPassword
//			'admin'			| passwordEncoder.encode('admin')
//			'user'			| passwordEncoder.encode('user')
//    }

}
