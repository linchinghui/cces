package com.lch.aaa

import com.lch.aaa.Function;

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Function)
class FunctionSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

	void "Function::save()"() {
		when:
			(1..10).each {
				def f = new Function(name:"f${it}", description: "function $it")
				f.save(flush: true)
				println f
			}
	
//			println "functions: ${Function.list()}"

		then:
			Function.count() > 1
	}
}
