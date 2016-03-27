package com.lch.cces

import grails.rest.Resource

@Resource(uri = '/api/assignments', superClass = AssignmentController)
class Assignment implements Serializable, Comparable<Assignment> {

	Worker	employee	// 員工
	Project	project		// 專案
	Integer	year		// 年度
	Integer	week		// 週次
	Boolean	d1 = false	// 日
	Boolean	d2 = false	// 一
	Boolean	d3 = false	// 二
	Boolean	d4 = false	// 三
	Boolean	d5 = false	// 四
	Boolean	d6 = false	// 五
	Boolean	d7 = false	// 六

	static mapping = {
		version false

		id		composite: ['employee', 'project', 'year', 'week']
	}

	static constraints = {
		employee	blank: true, nullable: true
		project		blank: false, nullable: false
		year		blank: false, nullable: false
		week		blank: false, nullable: false
		// d1			blank: true, nullable: true
		// d2			blank: true, nullable: true
		// d3			blank: true, nullable: true
		// d4			blank: true, nullable: true
		// d5			blank: true, nullable: true
		// d6			blank: true, nullable: true
		// d7			blank: true, nullable: true
	}


	public String getId() {
		"${employee?.id}|${project?.id}|${year}|${week}"
	}
	// public void setId(String _id) {
	// }

	public String toString() {
		"${employee?.id}-${project?.name}:${year}.${week}(s:${d1?'v':'x'}/m:${d2?'v':'x'}/t:${d3?'v':'x'}/w:${d4?'v':'x'}/t:${d5?'v':'x'}/f:${d6?'v':'x'}/s:${d7?'v':'x'})"
	}

	public int compareTo(def other) {
//println "${other?.employeeId}${other?.projectId}${other?.year}${other?.week}"
		return employeeId <=> other?.employeeId ?: 
			projectId <=> other?.projectId ?: 
			year <=> other?.year ?: 
			week <=> other?.week
	}

}
