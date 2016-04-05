package com.lch.cces

import com.lch.aaa.*

class AssignmentController extends BaseController<Assignment> {

    static namespace = Application.NAMESPACE_API

    AssignmentController() {
        super(Assignment)
    }

    private void resolveParameters(params) {
        def compIds = params?.id?.split('\\|')

        if (compIds?.size() >= 1) {
            if (compIds[0] != 'null') {
                if (params?.employeeId == null) {
                    params['employeeId'] = compIds[0]
                }

            } else {
                params.remove('id') // to identify 'CREATE'
            }

            if (compIds?.size() >= 2) { params['projectId'] = compIds[1] }
            if (compIds?.size() >= 3) { params['year']      = compIds[2] }
            if (compIds?.size() >= 4) { params['week']      = compIds[3] }
        }
    }

    private List<Assignment> listAllAssignments(Map params) {
        log.debug "list assignment(s): ${params}"
        resolveParameters(params)

        return Assignment.where {
            if (params?.employeeId) { employee.id == params.employeeId }
            if (params?.projectId)  { project.id  == params.projectId }
            if (params?.year) { year == (params.year as int) }
            if (params?.week) { week == (params.week as int) }
            if (params?.d0) { d0 == params.d0 }
            if (params?.d1) { d1 == params.d1 }
            if (params?.d2) { d2 == params.d2 }
            if (params?.d3) { d3 == params.d3 }
            if (params?.d4) { d4 == params.d4 }
            if (params?.d5) { d5 == params.d5 }
            if (params?.d6) { d6 == params.d6 }

        }.list(params)
    }

    protected final Assignment queryForResource(Serializable id) {
        listAllAssignments(params)[0]
    }

    protected final List<Assignment> listAllResources(Map params) {
        listAllAssignments(params)
    }

    protected final Assignment createResource(Map params) {
        resolveParameters(params)
        def props = params

        if (params?.employeeId) {
            props.employee = Worker.get(params.employeeId)
            props.remove('employeeId')
        }

        if (params?.projectId) {
            props.project = Project.get(params.projectId)
            props.remove('projectId')
        }

        return resource.newInstance(props)
    }

    protected final Assignment createResource() {
        return createResource(params)
    }

    def edit() {
        resolveParameters(params)

        // if (params?.employeeId && params?.projectId) {
        if (params?.id) { // CREATE
            super.edit()

        } else {
            redirect action: 'create', params: params
        }
    }

    /*
     * project sum-up info
     */
    def sumup() {
        log.debug "assignment sum-up: ${params}"
        resolveParameters(params)

        // if (params?.projectId) {
            respond combine4ClndrJS()

        // } else {
        //     response.status = 404
        //     respond ([warning: '未指定專案'])
        // }
    }

    private def combine4ClndrJS() {
        def calendar = Calendar.instance
        def year = params?.year as int
        def week = params?.week as int

        (1..7).inject([]) { result, no ->
            calendar.setWeekDate(year, week, no)

            def rec = countAssignmentBy(year, week, no)[0]
            if (rec) {
                def obj = [date: calendar.time.format('yyyy-MM-dd'), title: rec[2]]
                result += obj
            }

            result
        }
    }

    private def countAssignmentBy(year, week, dayNo) {
        Assignment.createCriteria().list {
            projections {
                groupProperty('year')
                groupProperty('week')
                count()
            }
            if (params?.projectId) {
                eq ('project.id', params.projectId)
            }
            eq ('year', year)
            eq ('week', week)
            eq ('d' + (dayNo-1), true)
        }
    }
}
