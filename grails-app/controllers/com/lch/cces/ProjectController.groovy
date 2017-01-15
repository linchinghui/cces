package com.lch.cces

import com.lch.aaa.*

class ProjectController extends BaseController<Project> {

    static namespace = Application.NAMESPACE_API

	ProjectController() {
        super(Project)
    }

    def brief() {
        boolean hasReadAuth = isReadAuthorized()
        if (! hasReadAuth) {
            unAuthorized()
            // return
        }
        log.trace "project brief: ${params}"

        def dataList = hasReadAuth ? listAllResources(params) : []

        // ignore ajax or not
        if (params?.format in ['all', 'form', null]) {
            def countName = "${resourceName}Count".toString()
            def dataCount = hasReadAuth ? countResources() : java.math.BigInteger.ZERO
            // represent xml or json by viewer
            respond dataList, view: 'brief', model: [ (countName): dataCount ]

        } else {
            respond dataList
        }
    }

    def constructNos() {
        boolean hasReadAuth = isReadAuthorized()
        if (! hasReadAuth) {
            unAuthorized()
            // return
        }

        def dataList = hasReadAuth ? listAllResources(params) : []

        // ignore ajax or not
        if (params?.format in ['all', 'form', null]) {
            def countName = "${resourceName}Count".toString()
            def dataCount = hasReadAuth ? countResources() : java.math.BigInteger.ZERO
            // represent xml or json by viewer
            respond dataList, view: 'constructNos', model: [ (countName): dataCount ]

        } else {
            respond dataList
        }
    }

    def projectTypes() {
        respond ProjectType.map()
    }

    def constructTypes() {
        respond ConstructType.map()
    }
}
