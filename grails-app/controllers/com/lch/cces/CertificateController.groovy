package com.lch.cces

import com.lch.aaa.*

class CertificateController extends BaseController<Certificate> {

    static namespace = Application.NAMESPACE_API

	CertificateController() {
		super(Certificate)
	}

	protected final List<Certificate> listAllResources(Map params) {
        return Certificate.where {
			if (params?.emp?.id)  { emp.id == params.emp.id }
		}.list(params)
    }

}
