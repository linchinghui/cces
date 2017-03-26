package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/projects', superClass = ProjectController)
class Project {

	String			id				// primary key, 一律小寫
	String			code			// 專案代碼, alias of id
	String			description		// 專案名稱
	String			constructNo		// 機台編號 (註: 使用原序號欄位)
	String			constructModel	// 機台類型
	String			constructPlace	// 工程地點
	String			projectKind		// 工作型態
	ProjectType		projectType		// 工作型態 (for input/display)
	String			constructCode	// 施作方式
	ConstructType	constructType	// 施作方式 (for input/display)
	@BindingFormat("yyyy/MM/dd'Z'")
	Date			durationBegin	// 期程-開始
	@BindingFormat("yyyy/MM/dd'Z'")
	Date			durationEnd		// 期程-結束
	String			contact			// 合約 | 委外編號
	String			customer		// 甲方
	String			contactPerson	// 聯絡人
	String			contactPhoneNo	// 手機
	String			note			// 備註
	@BindingFormat("yyyy/MM/dd'Z'")
	Date			acceptanceDate	// 驗收日
	Boolean			closed = false	// 結案 (已入帳者)

	static transients = ['projectType', 'constructType']

    static constraints = {
    	code			blank: false, nullable: false, maxSize: 20 //, unique: true // PK is unique already
		description		blank: false, nullable: false, maxSize: 40
		constructNo		blank: true, nullable: true, maxSize: 20, unique: true
		constructModel	blank: true, nullable: true, maxSize: 20
		constructPlace	blank: false, nullable: false, maxSize: 40
		projectKind		blank: false, nullable: false, inList: ProjectType.values()*.id
		projectType		blank: false, nullable: false
		constructCode	blank: false, nullable: false, inList: ConstructType.values()*.id
		constructType	blank: false, nullable: false
		durationBegin	blank: true, nullable: true
		durationEnd		blank: true, nullable: true, validator: { val, obj ->
			def isOK = obj.id == null || val == null || val >= obj.durationBegin
			if (! isOK) {
				return ['default.invalid.endDate', val?.format('yyyy/MM/dd'), obj.durationBegin?.format('yyyy/MM/dd')]
			}
			return isOK
		}
		contact			blank: true, nullable: true, maxSize: 36
		customer		blank: true, nullable: true, maxSize: 40
		contactPerson	blank: true, nullable: true, maxSize: 40
		contactPhoneNo	blank: true, nullable: true, maxSize: 12
		note			blank: true, nullable: true, maxSize: 255
		acceptanceDate	blank: true, nullable: true
		closed			blank: true, nullable: true
    }

	static mapping = {
		version			false
		sort			'id'

		id				generator: 'assigned', name: 'code'
		projectKind		name: 'projectType', column: 'type'
		constructCode	name: 'constructType'
	}

	String getCode() {
		this.id
	}
	void setCode(String code) {
		this.id = code?.toLowerCase()
	}

	ProjectType getProjectType() {
		projectKind ? ProjectType.salvage(projectKind) : null
	}
	void setProjectType(ProjectType type) {
		projectKind = type?.id
	}

	ConstructType getConstructType() {
		constructCode ? ConstructType.salvage(constructCode) : null
	}
	void setConstructType(ConstructType type) {
		constructCode = type?.id
	}

	public String toString() {
		"($id) ${description}"
	}
}
