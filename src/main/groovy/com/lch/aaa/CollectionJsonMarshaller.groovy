package com.lch.aaa

import grails.converters.JSON
import org.grails.web.json.JSONWriter
import org.grails.web.converters.exceptions.ConverterException
import org.grails.web.converters.marshaller.json.CollectionMarshaller

class CollectionJsonMarshaller extends CollectionMarshaller implements PackageSupportable {

	@Override
	public boolean supports(Object object) {
		return isCollectionSupport(object)
	}

	@Override
	public void marshalObject(Object object, JSON converter) throws ConverterException {
		JSONWriter writer = converter.getWriter()
		writer.array()
		object.each { o1 ->
			converter.convertAnother(o1)
		}
		writer.endArray()
	}
}