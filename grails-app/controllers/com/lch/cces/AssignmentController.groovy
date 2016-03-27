package com.lch.cces

import com.lch.aaa.*

class AssignmentController extends BaseController<Assignment> {

    static namespace = Application.NAMESPACE_API
//	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE", sumup:['GET','POST']]

    AssignmentController() {
        super(Assignment)
    }

    def sumup() {
        if (params?.project) {
            respond combine4ClndrJS()

        } else {
            response.status = 404
            respond ([warning: '未指定專案'])
        }
    }

    private def combine4ClndrJS() {
        def calendar = Calendar.instance
        def year = params?.year as int
        def week = params?.week as int

        (1..7).inject([]) { result, no ->
            calendar.setWeekDate(year, week, no)

            def rec = countAssignmentBy(year, week, no)[0]
            def date = calendar.time.format('yyyy/MM/dd')

            if (rec) {
                def obj = [date: date, title: rec[2]]
                result += obj
            }
            result
        }
    }

    private def countAssignmentBy(year, week, day) {
        Assignment.createCriteria().list {
            projections {
                groupProperty('year')
                groupProperty('week')
                count()
            }
            eq ('project.id', params?.project)
            eq ('year', year)
            eq ('week', week)
            eq ('d'+day, true)
        }
    }
}
