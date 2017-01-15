package com.lch.cces

import com.lch.aaa.*

class CertificateOrganController extends BaseController<CertificateOrgan> {

    static namespace = Application.NAMESPACE_API

    def certificateOrganService

	CertificateOrganController() {
        super(CertificateOrgan)
    }

    protected final CertificateOrgan queryForResource(id) {
    	return certificateOrganService.get(id)
    }

    protected final CertificateOrgan saveResource(CertificateOrgan certificateOrgan) {
        return certificateOrganService.save(certificateOrgan)
    }

    protected final deleteResource(CertificateOrgan certificateOrgan) {
        certificateOrganService.delete(certificateOrgan)
    }

}
