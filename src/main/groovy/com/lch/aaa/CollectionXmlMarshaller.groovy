package com.lch.aaa

import java.lang.reflect.ParameterizedType
import org.grails.web.converters.marshaller.xml.CollectionMarshaller

class CollectionXmlMarshaller extends CollectionMarshaller implements PackageSupportable {

	@Override
	public boolean supports(Object object) {
// 		def rc = isCollectionSupport(object)

// 		if (rc) {
// // println "object?.metaClass.properties*.name"
// // println "delegate.class: ${object.delegate.class}"
// 			def type = object.genericType
// 			if (type instanceof ParameterizedType) {
// 	        	def clazz = gt?.actualTypeArguments[0]
// 	println "0 actual class of object: ${clazz.simpleName}"
// 			} else {
// 	println "0        class of object: ${object.class.simpleName}"
// 			}
// 		}

// 		return rc
		return isCollectionSupport(object)
	}

// 	@Override
// 	String getElementName(final Object object) {

// // println "object?.metaClass.properties*.name"
// // println "delegate.class: ${delegate.class}"
// // 		def type = object?.genericType
// // 		if (type instanceof ParameterizedType) {
// //         	def clazz = (Class<?>) gt?.actualTypeArguments[0]
// // println "2 actual class of object: ${clazz.simpleName}"
// // 		} else {
// // println "2        class of object: ${object.simpleName}"
// // 		}

// 		super.getElementName(object)
// 	// 	if (object instanceof Set) {
// 	// 		return 'set'
// 	// 	}
// 	// 	def rc = object?.size() > 0 ? object?.first().class.simpleName.toLowerCase() : null
// 	// 	return rc ? (rc.size() > 1 && rc[-1] == 'y' ? (rc - ~/y$/ + 'ies') : (rc + 's')) : 'list'
// 	}
}