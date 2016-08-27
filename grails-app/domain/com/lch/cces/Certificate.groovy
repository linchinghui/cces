package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/certificates', superClass = CertificateController)
class Certificate { //implements Serializable, Comparable<Certificate> {

	Worker				emp			// 人員
	CertificateCategory	category	// 證照類別
	String				title		// 證照名稱
	@BindingFormat("yyyy/MM/dd'Z'")
	Date				examDate	// 考取年月
	@BindingFormat("yyyy/MM/dd'Z'")
	Date				expiryDate	// 有效年月(回訓時間)
	@BindingFormat("yyyy/MM/dd'Z'")
	Date				copied		// 證照影本繳交日
	String				photo		// 證照影本 URI

	static transients = ['photo']

	static constraints = {
		emp				blank: false, nullable: false
		category		blank: false, nullable: false
		title			blank: false, nullable: false, maxSize: 40
		examDate		blank: false, nullable: false
		expiryDate		blank: true, nullable: true
		copied			blank: true, nullable: true
		photo			blank: true, nullable: true, maxSize: 40
	}

	static mapping = {
		version			false
		sort			'id'

		// TODO: 同一個 title 可能會有多個時期的認證 ?
		// id			composite: ['emp', 'title']
	}

	// public String getId() {
	// 	"${emp?.id}|${title}"
	// }

	public String toString() {
	// 	"${title}:${uri}"
		"${examDate ? examDate.format('YYYY/MM ') : ''}$title"
	}

	// public int compareTo(def other) {
	// 	return empId <=> other?.empId ?: title <=> other?.title
	// }

}