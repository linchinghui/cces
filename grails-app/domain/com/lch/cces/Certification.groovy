package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/certifications', superClass = CertificationController)
class Certification implements Serializable, Comparable<Certification> {

	Worker	emp			// 人員
	String	title		// 證照名稱
	// @BindingFormat("yyyy/MM/dd'Z'")
	// Date	examDate	// 考取年月
	// @BindingFormat("yyyy/MM/dd'Z'")
	// Date	expiryDate	// 有效年月
	// @BindingFormat("yyyy/MM/dd'Z'")
	// Date	reExamDate	// 回訓日期
	// @BindingFormat("yyyy/MM/dd'Z'")
	// Date	copied		// 證照影本繳交日
	// String	uri			// 證照影本 URI
	URI	uri			// 證照影本 URI

	static mapping = {
		version		false
		// sort		'id'

		id			composite: ['emp', 'title']
	}

	static constraints = {
		emp			blank: false, nullable: false
		title		blank: false, nullable: false, maxSize: 40
		// examDate	blank: false, nullable: false
		// expiryDate	blank: true, nullable: true
		// reExamDate	blank: true, nullable: true
		// copied		blank: true, nullable: true
		uri			blank: true, nullable: true, maxSize: 40		
	}

	public String getId() {
		"${emp?.id}|${title}"
	}

	public String toString() {
		"${title}:${uri}"
	}

	public int compareTo(def other) {
		return empId <=> other?.empId ?: title <=> other?.title
	}

}
