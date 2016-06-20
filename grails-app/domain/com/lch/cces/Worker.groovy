package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/workers', superClass = WorkerController)
class Worker {

	String	id				// 一律小寫
	String	empNo			// 員工編號, alias of id
	String	empName			// 員工姓名
	SexType	sex				// 姓別

	@BindingFormat("yyyy/MM/dd'Z'")
	Date	employedDate	// 到職日
	@BindingFormat("yyyy/MM/dd'Z'")
	Date	resignedDate	// 離職日

	@BindingFormat("yyyy/MM/dd'Z'")
	Date	avatarCopied	// 大頭照繳交日
	String	avatarPhoto		// 大頭照

	@BindingFormat("yyyy/MM/dd'Z'")
	Date	idCardCopied	// 身分證影本繳交日
	String	idCardPhoto		// 身分證影本

	@BindingFormat("yyyy/MM/dd'Z'")
	Date	nhiIcCardCopied	// 健保卡影本繳交日
	String	nhiIcCardPhoto	// 健保卡影本

	@BindingFormat("yyyy/MM/dd'Z'")
	Date	diplomaCopied	// 畢業證書影本繳交日
	String	diplomaPhoto		// 畢業證書影本

	@BindingFormat("yyyy/MM/dd'Z'")
	Date	oorCopied		// 退伍令(Order of Retirement)影本繳交日
	String	oorPhoto			// 退伍令影本

	@BindingFormat("yyyy/MM/dd'Z'")
	Date	gdlCopied		// 駕照(General Driving License)影本繳交日
	String	gdlPhoto		// 駕照影本

	static transients = ['avatarPhoto', 'idCardPhoto', 'nhiIcCardPhoto', 'diplomaPhoto', 'oorPhoto', 'gdlPhoto']

	// static hasMany = [certifications: Certification]

	static constraints = {
		empNo				blank: false, nullable: false, maxSize: 10, unique: true
		empName				blank: false, nullable: false, maxSize: 10
		sex					blank: false, nullable: false
		employedDate		blank: false, nullable: false
		resignedDate		blank: true, nullable: true
		avatarCopied		blank: true, nullable: true
		avatarPhoto			blank: true, nullable: true, maxSize: 40
		idCardCopied		blank: true, nullable: true
		idCardPhoto			blank: true, nullable: true, maxSize: 40
		nhiIcCardCopied		blank: true, nullable: true
		nhiIcCardPhoto		blank: true, nullable: true, maxSize: 40
		diplomaCopied		blank: true, nullable: true
		diplomaPhoto		blank: true, nullable: true, maxSize: 40
		oorCopied			blank: true, nullable: true
		oorPhoto			blank: true, nullable: true, maxSize: 40
		gdlCopied			blank: true, nullable: true
		gdlPhoto			blank: true, nullable: true, maxSize: 40
 	}

	static mapping = {
		version			false

		id				generator: 'assigned', name: 'empNo'
		empNo			column: 'emp_id'
//		certifications	joinTable: false, column: 'emp_id', lazy: true // false
	}

  /*
   *
   */
	String getEmpNo() {
		this.id
	}
	void setEmpNo(String empNo) {
		this.id = empNo?.toLowerCase()
	}

	private def persistImage = { propName, content ->
		(content instanceof String) ? content : ImageHelper.persist(content, this, propName)
	}

	void setAvatarPhoto(photo) {
		this.avatarPhoto = persistImage('avatarPhoto', photo)
	}
	void setIdCardPhoto(photo) {
		this.idCardPhoto = persistImage('idCardPhoto', photo)
	}
	void setNhiIcCardPhoto(photo) {
		this.nhiIcCardPhoto = persistImage('nhiIcCardPhoto', photo)
	}
	void setDiplomaPhoto(photo) {
		this.diplomaPhoto = persistImage('diplomaPhoto', photo)
	}
	void setOorPhoto(photo) {
		this.oorPhoto = persistImage('oorPhoto', photo)
	}
	void setGdlPhoto(photo) {
		this.gdlPhoto = persistImage('gdlPhoto', photo)
	}

	public String toString() {
		"${empName}"
	}
}
