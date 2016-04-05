package com.lch.cces

import grails.rest.Resource

@Resource(uri = '/api/assignments', superClass = AssignmentController)
class Assignment implements Serializable, Comparable<Assignment> {

	Worker	employee	// 員工
	Project	project		// 專案
	Integer	year		// 年度
	Integer	week		// 週次
	Boolean	d0 = false	// 日
	Boolean	d1 = false	// 一
	Boolean	d2 = false	// 二
	Boolean	d3 = false	// 三
	Boolean	d4 = false	// 四
	Boolean	d5 = false	// 五
	Boolean	d6 = false	// 六

	static mapping = {
		version false

		id		composite: ['employee', 'project', 'year', 'week']
	}

	static constraints = {
		employee	blank: true, nullable: true
		project		blank: false, nullable: false
		year		blank: false, nullable: false, size: 4
		week		blank: false, nullable: false, size: 2, range:1..53 // min: 1, max: 53
		// d1		blank: true, nullable: true
		// d2		blank: true, nullable: true
		// d3		blank: true, nullable: true
		// d4		blank: true, nullable: true
		// d5		blank: true, nullable: true
		// d6		blank: true, nullable: true
		// d7		blank: true, nullable: true
	}


	public String getId() {
		"${employee?.id}|${project?.id}|${year}|${week}"
	}
	// public void setId(String _id) {
	// }

	public String toString() {
		"${employee?.id}-${project?.id}:${year}.${week}(${d0?'S':'_'}${d1?'M':'_'}${d2?'T':'_'}${d3?'W':'_'}${d4?'T':'_'}${d5?'F':'_'}${d6?'S':'_'})"
	}

	public int compareTo(def other) {
		return employeeId <=> other?.employeeId ?: 
			projectId <=> other?.projectId ?: 
			year <=> other?.year ?: 
			week <=> other?.week
	}

}
