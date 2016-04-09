package com.lch.cces

import com.lch.aaa.*

class AnnouncementController extends BaseController<Announcement> {

    static namespace = Application.NAMESPACE_API

    AnnouncementController() {
        super(Announcement)
    }

}
