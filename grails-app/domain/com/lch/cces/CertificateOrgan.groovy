package com.lch.cces

import grails.rest.Resource

@Resource(uri = '/api/certificateOrgans', superClass = CertificateOrganController)
class CertificateOrgan {

	String			id					// primary key, 一律小寫
	String			code				// 機構代碼, alias of id
	String			description			// 機構名稱

    static constraints = {
		code		blank: false, nullable: false, maxSize: 20 //, unique: true // PK is unique already
		description	blank: false, nullable: false, maxSize: 100
    }

	static mapping = {
		version		false
		sort		'id'
		//cache		usage: 'read-only', include: 'non-lazy'
		cache		usage: 'read-write'

		id			generator: 'assigned', name: 'code'
	}

	String getCode() {
		this.id
	}
	void setCode(String code) {
		this.id = code?.toLowerCase()
	}

	public String toString() {
		"${description}"
	}

}
