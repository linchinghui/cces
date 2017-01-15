package com.lch.cces

import com.lch.aaa.*

class CertificateCategoryController extends BaseController<CertificateCategory> {

    static namespace = Application.NAMESPACE_API

    def certificateCategoryService

	CertificateCategoryController() {
        super(CertificateCategory)
    }

    protected final CertificateCategory queryForResource(id) {
    	return certificateCategoryService.get(id)
    }

    protected final CertificateCategory saveResource(CertificateCategory certificateCategory) {
        return certificateCategoryService.save(certificateCategory)
    }

    protected final deleteResource(CertificateCategory certificateCategory) {
        certificateCategoryService.delete(certificateCategory)
    }

}
