package com.lch.aid

import com.lch.aaa.*
import com.lch.cces.*
import static org.springframework.http.HttpStatus.*
import grails.converters.*
import groovy.util.ConfigObject

class DynamicEnumController {

	static namespace = Application.NAMESPACE_API

	def authenticationService

	/*
	 * authentication and authorization
	 */
	private boolean isAuthorized(property) {
		def privileges = request['privileges'] ?: ( request['privileges'] =
			authenticationService.privileges.findAll {
				it.function.id == controllerName.toLowerCase() // by controller
			}
		)
		true in privileges*."$property"
	}

	private boolean isReadAuthorized() {
		isAuthorized 'canRead'
	}

	private boolean isWriteAuthorized() {
		isAuthorized 'canWrite'
	}

	private boolean isDeleteAuthorized() {
		isAuthorized 'canDelete'
	}

	private def unAuthorized() {
		commonWarning(UNAUTHORIZED, '無作業權限')
	}

	private def commonWarning(replyCode, message) {
		if (isAjax()) {
			// log.trace ("$replyCode @ isAjax()")
			render status: replyCode

		} else { // 配合 JS
			// log.trace ("$replyCode @ callback")
			response.status = replyCode.value()
			render message
		}
	}

	/*
	 * helper
	 */
	final boolean isAjax() {
		request['isAjax']
		// request.getHeader('X-Requested-With') == 'XMLHttpRequest'
	}

	def index() {
		boolean hasReadAuth = isReadAuthorized()
		if (! hasReadAuth) {
			unAuthorized()
			// return
		}

		def specActionName = request.getHeader('X-CCES-ACTION')

		if (specActionName) {
			// ignore parameter max
			this.&"${specActionName}"?.call()

		} else {
			def models = ['project', 'construct'].inject([:]) { result, it ->
				def cfgName = it + 'Type' // String type
				def cfg = Application.loadConfiguration("${cfgName}.groovy")
				result += [(cfgName): cfg."$cfgName"]
			}
			render view: 'list', model: models
		}
    }

	def create() {
		if (! isWriteAuthorized()) {
			unAuthorized()
			// return
		}

		def clazz = Class.forName(DynamicEnumMaker.ENUM_PACKAGE + params.type.capitalize())
		// def columnNames = clazz.declaredFields.findAll {
		// 	it.name.startsWith('com_lch_cces')
		// }.collect {
		// 	it.name.split('__')[-1]
		// }

		render view: 'create', model: [
			typeLabel: clazz.&"label".call(),
			// typeConstraints: clazz."com_lch_cces_GenericEnumerable__constraints"
			typeConstraints: clazz.&"constraints".call()
		]
	}

	def save() {
		if (! isWriteAuthorized()) {
			unAuthorized()
			return
		}

		def replyCode = NOT_ACCEPTABLE.value()
		def msg = '已存檔'
		def type = request.JSON?.type

		if (type) {
			try {
				def typeCfg = new ConfigObject()
				typeCfg.put(type, request.JSON?.types?.toArray())
				Application.saveConfiguration(type+'.groovy', typeCfg)

				def clazz = Class.forName(DynamicEnumMaker.ENUM_PACKAGE + type.capitalize())
				// DynamicEnumMaker.clear(clazz)
				// DynamicEnumMaker.loadFrom(filePath)
				DynamicEnumMaker.reloadFrom(type+'.groovy', clazz)

				replyCode = CREATED.value()

			} catch (e) {
				msg = e.message
			}
		} else {
			msg = 'Bad Request Parameters'
		}

		render ([status: replyCode, message: msg] as JSON)
//test1:
		// render ([status: UNAUTHORIZED.value(), errors: '測試'] as JSON)
//test2:
		// response.status =UNAUTHORIZED.value()
	}

	def delete() {
		if (! isDeleteAuthorized()) {
			unAuthorized()
			return
		}

		render template: '/layouts/deleted', model: [callback: params?.cb, result: [type: params.type, id: params.id, status: OK.value()]]
	}

	def projectTypes() {
        respond ProjectType.map()
    }

    def constructTypes() {
        respond ConstructType.map()
    }

}
