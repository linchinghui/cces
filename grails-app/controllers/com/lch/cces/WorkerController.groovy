package com.lch.cces

import com.lch.aaa.*

class WorkerController extends BaseController<Worker> {

    static namespace = Application.NAMESPACE_API

	WorkerController() {
        super(Worker)
    }

    def brief() {
        boolean hasReadAuth = isReadAuthorized()
        if (! hasReadAuth) {
            unAuthorized()
            // return
        }
        log.trace "worker brief: ${params}"

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

}
