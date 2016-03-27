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

//	@BindingFormat("yyyy/MM/dd'T'HH:mm:ss'Z'")
	@BindingFormat("yyyy/MM/dd'Z'")
	Date	avatarCopied	// 大頭照繳交日
	String	avatarUri		// 大頭照 URI
//	@BindingFormat("yyyy/MM/dd'T'HH:mm:ss'Z'")
	@BindingFormat("yyyy/MM/dd'Z'")
	Date	idCardCopied	// 身分證影本繳交日
	String	idCardUri		// 身分證影本 URI

	@BindingFormat("yyyy/MM/dd'Z'")
	Date	nhiIcCardCopied	// 健保卡影本繳交日
	String	nhiIcCardUri	// 健保卡影本 URI
	@BindingFormat("yyyy/MM/dd'Z'")
	Date	diplomaCopied	// 畢業證書影本繳交日
	String	diplomaUri		// 畢業證書影本 URI
	@BindingFormat("yyyy/MM/dd'Z'")
	Date	oorCopied		// 退伍令(Order of Retirement)影本繳交日
	String	oorUri			// 退伍令影本 URI
	@BindingFormat("yyyy/MM/dd'Z'")
	Date	gdlCopied		// 駕照(General Driving License)影本繳交日
	String	gdlUri			// 駕照影本 URI

	static transients = ['avatarUri', 'idCardUri', 'nhiIcCardUri', 'diplomaUri', 'oorUri', 'gdlUri']

//	static hasMany = [certifications: Certification]

    static constraints = {
		empNo			blank: false, nullable: false, maxSize: 10, unique: true
		empName			blank: false, nullable: false, maxSize: 10
		sex				blank: false, nullable: false
		employedDate	blank: false, nullable: false
		resignedDate	blank: true, nullable: true
		avatarCopied	blank: true, nullable: true
		avatarUri		blank: true, nullable: true, maxSize: 40		
		idCardCopied	blank: true, nullable: true
		idCardUri		blank: true, nullable: true, maxSize: 40		
		nhiIcCardCopied	blank: true, nullable: true
		nhiIcCardUri	blank: true, nullable: true, maxSize: 40		
		diplomaCopied	blank: true, nullable: true
		diplomaUri		blank: true, nullable: true, maxSize: 40		
		oorCopied		blank: true, nullable: true
		oorUri			blank: true, nullable: true, maxSize: 40		
		gdlCopied		blank: true, nullable: true
		gdlUri			blank: true, nullable: true, maxSize: 40		
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

	public String toString() {
		"${empName}"
	}
}
