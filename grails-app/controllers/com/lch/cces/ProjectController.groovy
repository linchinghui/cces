package com.lch.cces

import com.lch.aaa.*
//import grails.converters.*

class ProjectController extends BaseController<Project> {

    static namespace = Application.NAMESPACE_API

    ProjectController() {
        super(Project)
    }

	// def index(Integer max) {
	// 	def specActionName = request.getHeader('X-CCES-ACTION')

	// 	if (specActionName) {
	// 		// ignore parameter max
	// 		this.&"${specActionName}"?.call()

	// 	} else {
	// 		super.index(max)
	// 	}
 //    }

	def brief() {
        log.debug "project brief: ${params}"

        def dataList = listAllResources(params)

        // ignore ajax or not
        if (params?.format in ['all', 'form', null]) {
			def countName = "${resourceName}Count".toString()
	        def dataCount = countResources()
	        // represent xml or json by viewer
            respond dataList, view: 'brief', model: [ (countName): dataCount ]

        } else {
	        respond dataList
        }
    }

	def constructTypes() {
        respond ConstructType.map()
	}
}
