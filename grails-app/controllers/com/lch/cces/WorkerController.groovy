package com.lch.cces

import com.lch.aaa.*
// import grails.transaction.Transactional

class WorkerController extends BaseController<Worker> {

    static namespace = Application.NAMESPACE_API

	WorkerController() {
        super(Worker)
    }

	// @Transactional // XXX: bugy?
	def delete() {
		if (! isDeleteAuthorized()) {
			unAuthorized()
			return
		}
		if (handleReadOnly()) {
			return
		}

		Certificate.withTransaction { transactionStatus ->
			try {
				Certificate.executeUpdate("delete Certificate where emp.id = :empId", [empId: params?.id])
				super.delete()

			} catch (e) {
				transactionStatus.setRollbackOnly()
				response.status = 500
				log.error e.message

				if (isAjax()) {
					respond ( errors: e.message )
				} else {
					render e.message
				}
				return
			}
		}
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
