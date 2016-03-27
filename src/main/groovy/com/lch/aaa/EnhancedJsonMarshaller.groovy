package com.lch.aaa

import grails.util.Holders
import grails.converters.JSON
import org.grails.web.json.JSONWriter
import org.grails.web.converters.exceptions.ConverterException
import org.grails.web.converters.marshaller.json.DomainClassMarshaller
import org.grails.core.DefaultGrailsDomainClass

class EnhancedJsonMarshaller extends DomainClassMarshaller /*implements ClassNameless<EnhancedJsonMarshaller>*/ {
	def excludes = ['class'] // no class name

	EnhancedJsonMarshaller() {
		super(false, Holders.grailsApplication)
	}

	EnhancedJsonMarshaller addExclude(def exclude) {
		excludes.add(exclude?.toString())
		excludes.toUnique()
		return this
	}

	// @Override
	// protected boolean excludesProperty(Object object, String property) {
	// 	// return isExclude(object, property)
	// 	return property in excludes || super.excludesProperty(object, property)
	// }

	@Override
	public void marshalObject(Object object, JSON converter) throws ConverterException {

		JSONWriter writer = converter.getWriter()
		writer.object().key('id').value(object.id)

		try {
			def fields =  new DefaultGrailsDomainClass(object.class).persistentProperties*.name

			fields.findAll {
				!(it in this.excludes)

			}.each { field ->
				def fieldValue = object."$field"
				writer.key(field)

				if (fieldValue instanceof Collection) {
					writer.array()
					try {
						fieldValue.each { o1 ->
							writer.object()
							writer.key('id').value(o1.id)
							writer.endObject()
						}
					} finally {
						writer.endArray()
					}
				} else {
					writer.value(fieldValue)
				}
			}
		} finally {
			writer.endObject()
		}
	}
}
