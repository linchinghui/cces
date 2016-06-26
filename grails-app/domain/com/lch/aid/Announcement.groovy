package com.lch.aid

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/announcements', superClass = AnnouncementController)
class Announcement {

	@BindingFormat("yyyy/MM/dd'T'HH:mm:ss'Z'")
	Date				announcedDate	// 公告日期
	@BindingFormat("yyyy/MM/dd'Z'")
	Date				revokedDate		// 撤榜日期
	@BindingFormat("yyyy/MM/dd'Z'")
	Date				createdDate		// 資料建立日期
	String				description		// 告示內容

	static constraints = {
		description		blank: false, nullable: false, maxSize: 200
		announcedDate	blank: true, nullable: true
		revokedDate		blank: true, nullable: true, validator: { val, obj ->
			def isOK = obj.id == null || val >= obj.announcedDate
			if (! isOK) {
				return ['default.invalid.endDate', val?.format('yyyy/MM/dd'), obj.announcedDate?.format('yyyy/MM/dd')]
			}
			return isOK
		}
		createdDate		blank: false, nullable: false
	}

	static mapping = {
		version			false
		sort			'announcedDate'
	}

	def beforeInsert() {
		if (announcedDate == null) {
			announcedDate = new Date()
		}
		if (revokedDate == null) {
			revokedDate = announcedDate + 7
		}
		// revokedDate.clearTime()
		if (createdDate == null) {
			createdDate = new Date()
		}
		createdDate.clearTime()
	}

	public String toString() {
		"${description}"
	}
}
