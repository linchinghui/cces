package com.lch.aid

import grails.util.Holders
import org.grails.web.converters.marshaller.xml.DomainClassMarshaller

class EnhancedXmlMarshaller extends DomainClassMarshaller /*implements ClassNameless<EnhancedXmlMarshaller>*/ {
	def excludes = ['class'] // no class name

	EnhancedXmlMarshaller() {
		super(false, Holders.grailsApplication)
	}

	EnhancedXmlMarshaller addExclude(def exclude) {
		excludes.add(exclude?.toString())
		excludes.toUnique()
		return this
	}

	@Override
	protected boolean excludesProperty(Object object, String property) {
		// return isExclude(object, property)
		return property in excludes || super.excludesProperty(object, property)
	}
}
