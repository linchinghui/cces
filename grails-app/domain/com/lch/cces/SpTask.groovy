package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/spTasks', superClass = SpTaskController)
class SpTask implements Serializable, Comparable<SpTask> {

	Project			project			// 園區專案
	@BindingFormat("yyyy/MM/dd")
	Date			workedDate		// 施工日期(建檔日期)
	Worker			employee		// 工作人員(員工)
	String			constructPlace	// 工程地點
	String			equipment		// 機台型號
	String			constructCode	// 施作方式
	ConstructType	constructType	// 施作方式 (input/display)
	String			note			// 備註

    static constraints = {
		project			blank: false, nullable: false
		workedDate		blank: false, nullable: false
		employee		blank: false, nullable: false
		constructPlace	blank: true, nullable: true, maxSize: 40
		equipment		blank: true, nullable: true
		constructCode	blank: true, nullable: true, inList: ConstructType*.id
//		constructType	blank: true, nullable: true
		note			blank: true, nullable: true, maxSize: 255
    }

	static mapping = {
		version			false

		id				composite: ['project', 'workedDate', 'employee']
		constructCode	name: 'constructType'
	}

	public String getId() {
		"${project?.id}|${workedDate?.format('yyyy-MM-dd')}|${employee?.id}"
	}

	// public void setId(String _id) {
	// }

	ConstructType getConstructType() {
		constructCode ? ConstructType.salvage(constructCode) : null
	}
	void setConstructType(ConstructType type) {
		constructCode = type?.id
	}

	public String toString() {
		"${project?.id}:${workedDate?.format('yyyy-MM-dd')}:${employee?.id}"
	}

	public int compareTo(def other) {
		return projectId <=> other?.projectId ?: 
			workedDate <=> other?.workedDate ?: 
			employeeId <=> other?.employeeId
	}

}
