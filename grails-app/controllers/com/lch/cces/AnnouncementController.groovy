package com.lch.cces

import com.lch.aaa.*

class AnnouncementController extends BaseController<Announcement> {

    static namespace = Application.NAMESPACE_API

    AnnouncementController() {
        super(Announcement)
    }

    def upToDate() {
        log.debug "assignment up-to-date: ${params}"

        def today = new Date()
        	today.clearTime()

        def dataList = Announcement.where {
            announcedDate <= (today + 1)
            revokedDate >= today
        }.list(params)

        def dataCount = dataList.size()

        respond (
        	draw: params.draw,
            recordsTotal: dataCount,
            recordsFiltered: dataCount,
            data: dataList
        )
    }

}
