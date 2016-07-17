package com.lch.aid

import com.lch.aaa.*

class AnnouncementController extends BaseController<Announcement> {

    static namespace = Application.NAMESPACE_API

    AnnouncementController() {
        super(Announcement)
    }

//     protected def boolean isReadAuthorized() {
//         true
//     }

    def upToDate() { // for every body
        boolean hasReadAuth = true // isReadAuthorized()
        // if (! hasReadAuth) {
        //     unAuthorized()
        //     return
        // }
        log.debug "announcement up-to-date()"

        def today = new Date()
        	today.clearTime()

        def dataList = hasReadAuth ? Announcement.where {
            announcedDate <= (today + 1)
            revokedDate >= today
        }.list(params) : []

        def dataCount = hasReadAuth ? dataList.size() : java.math.BigInteger.ZERO

        respond (
        	draw: params.draw,
            recordsTotal: dataCount,
            recordsFiltered: dataCount,
            data: dataList
        )
    }

}
