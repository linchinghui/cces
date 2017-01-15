package com.lch.cces

import com.lch.aaa.*

class CertificateController extends BaseController<Certificate> {

    static namespace = Application.NAMESPACE_API

	CertificateController() {
		super(Certificate)
	}
}
