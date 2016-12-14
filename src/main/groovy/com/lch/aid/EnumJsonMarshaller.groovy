package com.lch.aid

// import grails.rest.render.json.*
// import grails.rest.render.xml.*
// import grails.util.*
import grails.converters.JSON
import org.grails.web.json.JSONWriter
import org.grails.web.converters.exceptions.ConverterException
import org.grails.web.converters.marshaller.ObjectMarshaller

class EnumJsonMarshaller implements ObjectMarshaller<JSON>, PackageSupportable {
	@Override
	public boolean supports(java.lang.Object object) {
		def klass = object?.class
		return (klass?.isEnum() && isPackageSupport(klass?.package.name))
	}

	@Override
	public void marshalObject(Object object, JSON converter) throws ConverterException {
		JSONWriter writer = converter.getWriter()
		writer.object()

		try {
			writer
				// .key('id')
				.value(object?.id)
		} finally {
			writer.endObject()
		}
	}
}
