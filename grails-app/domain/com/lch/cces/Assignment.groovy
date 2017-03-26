package com.lch.cces

import grails.rest.Resource

@Resource(uri = '/api/assignments', superClass = AssignmentController)
class Assignment implements Serializable, Comparable<Assignment> {

	Project		project		// 專案
	Worker		employee	// 員工
	Integer		year		// 年度
	Integer		month		// 月份
	Boolean		d1 = false
	Boolean		d2 = false
	Boolean		d3 = false
	Boolean		d4 = false
	Boolean		d5 = false
	Boolean		d6 = false
	Boolean		d7 = false
	Boolean		d8 = false
	Boolean		d9 = false
	Boolean		d10 = false
	Boolean		d11 = false
	Boolean		d12 = false
	Boolean		d13 = false
	Boolean		d14 = false
	Boolean		d15 = false
	Boolean		d16 = false
	Boolean		d17 = false
	Boolean		d18 = false
	Boolean		d19 = false
	Boolean		d20 = false
	Boolean		d21 = false
	Boolean		d22 = false
	Boolean		d23 = false
	Boolean		d24 = false
	Boolean		d25 = false
	Boolean		d26 = false
	Boolean		d27 = false
	Boolean		d28 = false
	Boolean		d29 = false
	Boolean		d30 = false
	Boolean		d31 = false

	static mapping = {
		version		false
		table		'assignment2'
		id			composite: ['project', 'employee', 'year', 'month']
	}

	static constraints = {
		project		blank: false, nullable: false
		employee	blank: false, nullable: false
		year		blank: false, nullable: false, size: 4
		month		blank: false, nullable: false, size: 2, range:1..12
	}


	public String getId() {
		"${project?.id}|${employee?.id}|${year}|${month}"
	}
	// public void setId(String _id) {
	// }

	public String toString() {
		(1..31).inject("${project?.id}:${employee?.id}:${year}.${month}=") { res , no ->
			res += (this."d$no" ?(no % 10):'.')
		}
	}

	public int compareTo(def other) {
		return projectId <=> other?.projectId ?:
			employeeId <=> other?.employeeId ?:
			year <=> other?.year ?:
			month <=> other?.month
	}

}
