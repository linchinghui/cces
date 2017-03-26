package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/workers', superClass = WorkerController)
class Worker {

	String		id				// 一律小寫
	String		empNo			// 員工編號, alias of id
	String		empName			// 員工姓名
	SexType		sex				// 姓別

	@BindingFormat("yyyy/MM/dd'Z'")
	Date		employedDate	// 到職日
	@BindingFormat("yyyy/MM/dd'Z'")
	Date		resignedDate	// 離職日

	@BindingFormat("yyyy/MM/dd'Z'")
	Date		avatarCopied	// 大頭照繳交日
	Photo		avatarPhoto		// 大頭照 for I/O

	@BindingFormat("yyyy/MM/dd'Z'")
	Date		idCardCopied	// 身分證影本繳交日
	Photo		idCardPhoto		// 身分證影本 for I/O

	@BindingFormat("yyyy/MM/dd'Z'")
	Date		nhiIcCardCopied	// 健保卡影本繳交日
	Photo		nhiIcCardPhoto	// 健保卡影本 for I/O

	@BindingFormat("yyyy/MM/dd'Z'")
	Date		diplomaCopied	// 畢業證書影本繳交日
	Photo		diplomaPhoto	// 畢業證書影本 for I/O

	@BindingFormat("yyyy/MM/dd'Z'")
	Date		oorCopied		// 退伍令(Order of Retirement)影本繳交日
	Photo		oorPhoto		// 退伍令影本 for I/O

	@BindingFormat("yyyy/MM/dd'Z'")
	Date		gdlCopied		// 駕照(General Driving License)影本繳交日
	Photo		gdlPhoto		// 駕照影本 for I/O

	static hasMany = [certificates: Certificate]
	// static transients = ['avatarPhoto', 'idCardPhoto', 'nhiIcCardPhoto', 'diplomaPhoto', 'oorPhoto', 'PhotoType']

	static constraints = {
		empNo			blank: false, nullable: false, maxSize: 10 //, unique: true // PK is unique already
		empName			blank: false, nullable: false, maxSize: 10
		sex				blank: false, nullable: false, sqlType: 'varchar(1)'
		employedDate	blank: false, nullable: false
		resignedDate	blank: true, nullable: true, validator: { val, obj ->
			def isOK = obj.id == null || val == null || val >= obj.employedDate
			if (! isOK) {
				return ['default.invalid.endDate', val?.format('yyyy/MM/dd'), obj.employedDate?.format('yyyy/MM/dd')]
			}
			return isOK
		}
		avatarCopied	blank: true, nullable: true
		avatarPhoto		blank: true, nullable: true, maxSize: 40, type: PhotoUserType

		idCardCopied	blank: true, nullable: true
		idCardPhoto		blank: true, nullable: true, maxSize: 40, type: PhotoUserType

		nhiIcCardCopied	blank: true, nullable: true
		nhiIcCardPhoto	blank: true, nullable: true, maxSize: 40, type: PhotoUserType

		diplomaCopied	blank: true, nullable: true
		diplomaPhoto	blank: true, nullable: true, maxSize: 40, type: PhotoUserType

		oorCopied		blank: true, nullable: true
		oorPhoto		blank: true, nullable: true, maxSize: 40, type: PhotoUserType

		gdlCopied		blank: true, nullable: true
		gdlPhoto		blank: true, nullable: true, maxSize: 40, type: PhotoUserType
 	}

	static mapping = {
		version			false

		id				generator: 'assigned', name: 'empNo'
		empNo			column: 'emp_id'
//		certifications	joinTable: false, column: 'emp_id', lazy: true // false
	}

	private static def fieldNames = [
		'avatarPhoto', 'idCardPhoto', 'nhiIcCardPhoto', 'diplomaPhoto', 'oorPhoto', 'gdlPhoto']

	private beforeImages = []

	def afterLoad() {
		beforeImages = [avatarPhoto, idCardPhoto, nhiIcCardPhoto, diplomaPhoto, oorPhoto, gdlPhoto]
	}

	private def recoverPhoto = { photo, idx ->
		def mpf = photo?.multipartFile
		if (mpf==null || mpf.isEmpty()) {
			this."${fieldNames[idx]}" = beforeImages[idx]
		}
	}

	def beforeUpdate() {
		[avatarPhoto, idCardPhoto, nhiIcCardPhoto, diplomaPhoto, oorPhoto, gdlPhoto].eachWithIndex { photo, idx ->
			recoverPhoto(photo, idx)
		}
	}

	private def persistImages() {
		def obj = this

		[avatarPhoto, idCardPhoto, nhiIcCardPhoto, diplomaPhoto, oorPhoto, gdlPhoto].eachWithIndex { photo, idx ->
			def mpf = photo?.multipartFile
			if (mpf && ! mpf.isEmpty()) {
				ImageHelper.persist(obj, photo.multipartFile)
				def filename = beforeImages[idx]?.toString()
				if (filename && filename != photo.toString()) {
					ImageHelper.remove(obj, filename)
				}
			}
		}
	}

	def afterInsert() {
		persistImages()
	}
	def afterUpdate() {
		persistImages()
	}

	String getEmpNo() {
		this.id
	}
	void setEmpNo(String empNo) {
		this.id = empNo?.toLowerCase()
	}

	public String toString() {
		"($id) ${empName}"
	}
}
