package com.lch.aaa

import grails.converters.JSON
import org.grails.web.converters.exceptions.ConverterException
import org.grails.web.converters.marshaller.json.CollectionMarshaller

class DataTablesSupportMarshaller extends CollectionMarshaller implements PackageSupportable {

	@Override
	public boolean supports(Object object) {
		return 
//			object instanceof Map || 
				isCollectionSupport(object)
	}

	@Override
	public void marshalObject(java.lang.Object o, JSON converter) throws ConverterException {
//		def ml = [["options": []], ["files": []], [count: o.size()], [[data: o]]
//println "marshalObject object: $m"
		super.marshalObject(m, converter)
	}
}