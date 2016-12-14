package com.lch.aid

import grails.converters.XML
import org.grails.web.converters.exceptions.ConverterException
import org.grails.web.converters.marshaller.ObjectMarshaller

class EnumXmlMarshaller implements ObjectMarshaller<XML>, PackageSupportable {
	@Override
	public boolean supports(java.lang.Object object) {
		def klass = object?.class
		return (klass?.isEnum() && isPackageSupport(klass?.package.name))
	}

	@Override
	public void marshalObject(Object object, XML xml) throws ConverterException {
        try {
            xml.chars(object?.id)
        } catch (Exception e) {
            // ignored
        }
	}
}
