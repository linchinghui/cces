package com.lch.aaa

import grails.converters.*
import grails.rest.RestfulController
import grails.transaction.Transactional
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpHeaders

// combine restful
abstract class BaseController<T> extends RestfulController<T> {

	BaseController(Class<T> type) {
		super(type) // super(getClass().getTypeParameters()[0].getGenericDeclaration()) ?
	}


	protected final boolean isAjax() {
		request['isAjax'] // request.getHeader('X-Requested-With') == 'XMLHttpRequest'
	}
    
    // TODO:
    def final addError = { field, message ->
        if (flash.errors) {
            flash.errors.put(field, message)
        } else {
            flash.errors = [(field): message]
        }
    }
    
    // TODO:
    def final addMessage = { message ->
        flash.message = message
    }

	def index(Integer max) {
        def specActionName = request.getHeader('X-CCES-ACTION')

        if (specActionName) {
            // ignore parameter max
            this.&"${specActionName}"?.call()

        } else {
            list(max)
        }
    }

    private def list(max) {
        params.max = Math.min(max ?: 10, 100)
        def countName = "${resourceName}Count".toString()
        // "${resourceName}List" to represent dataList by default
        // def listName = "${resourceName}List".toString()

//flash.error="test flash"

        if (isAjax()) {
            def dataList = listAllResources(params)

            if (params?.draw) { // integrate with DataTables JS
                def dataCount = countResources()
// XXX: test datatables ...
//Thread.currentThread().sleep(1000)
// response.status = 404
                respond (
// message: 'TEST',
// warning: ['TEST','Hey'],
// error: 'TEST error',
                    draw: params.draw,
                    recordsTotal: dataCount,
                    recordsFiltered: dataCount, // TODO
                    data: dataList
                )

            } else {
                // when params.format is on of xml, json
                respond dataList
            }

        } else {
            // if (params?.format != null || request.format != 'all') {
            if (params?.format in ['all', 'form', null]) {
                // just render viewer (and use ajax to access data above)
                render view: 'list'//, model: [ (listName): dataList, (countName): dataCount ]

            } else {
                def dataList = listAllResources(params)
                def dataCount = countResources()

                respond dataList, model: [ (countName): dataCount ]
            }
        }
    }

    def show() {
        T instance = queryForResource(params?.id)
// println "show: ${flash?.message} | ${flash?.errors}  /  ${(! (flash?.message || flash?.errors))}"

        if (! (flash?.message || flash?.errors)) {
            if (instance == null) {
                notFound()
                return
            }
        }

        if (params?.format || request.format != 'all') {
            respond instance

        } else {
            render view: 'show', model: [(resourceName): instance]
        }
    }

    def boolean afterPropertiesValidate(instance, transactionStatus) {
        def isOK = true

        if (instance.hasErrors()) {
            isOK = false
            transactionStatus.setRollbackOnly()
            // original:
            // respond instance.errors, view:'create' // STATUS CODE 422

            // if (params?.format || request.format != 'all') {
            // if ((params?.format || request.format) in ['xml', 'json']) {
            // 配合 JS
            if (isAjax()) {
                respond ( errors: instance.errors )

            } else { // 配合 JS
                if (request.getHeader('callback')) {
                    render ( instance.errors as JSON )

                } else {
                    render view: (actionName == 'save' ? 'create' : 'edit'), model: [ (resourceName): instance ]
                }
            }
        }

        return isOK
    }

    def boolean persistResource(instance, transactionStatus) {
        def isOK = false
        def errorMessage = ''

        try {
            // instance.save flush: true
            saveResource(instance)
            isOK = true

        } catch (org.springframework.dao.DuplicateKeyException dke) {
            errorMessage = '資料重複'

        } catch (grails.validation.ValidationException ve) {
            if (instance.errors.allErrors == instance.errors.fieldErrors) {
                instance.errors.fieldErrors.each {
                    errorMessage += message(code: it.code, args: it.arguments)
                }

            } else {
                errorMessage = instance.errors.allErrors
            }
            
        } catch (e) {
            errorMessage = e.message
        }

        if (! isOK) {
// println "action name: $actionName"
// println "errors: ${flash.errors}"

            transactionStatus.setRollbackOnly()

            if (isAjax()) {
                respond ( errors: errorMessage )

            } else { // 配合 JS
                if (request.getHeader('callback')) {
                    render ( [errors: errorMessage] as JSON )

                } else {
                    flash.errors = errorMessage
                    render view: (actionName == 'save' ? 'create' : 'edit'), model: [ (resourceName): instance ]
                }
            }
        }

        return isOK
    }

    def renderSavedPage(instance) {
        request.withFormat {
            form multipartForm {
                // 配合 JS
                if (request.getHeader('callback')) {
                    if (actionName == 'save') {
                        render ([id: instance.id, status: CREATED.value(), message: '已新增'] as JSON)
                    } else {
                        render ([id: params.id, status: OK.value(), message: '已更新'] as JSON)
                    }

                } else {
                    // flash.message = message(code: 'default.created.message', args: [message(code: "${resourceName}.label".toString(), default: resourceClassName), instance.id])
                    // redirect instance
                    flash.message = (actionName == 'save') ? '已新增' : '已更新';
                    redirect controller: resourceName, action: 'show', id: instance.id
                }
            }
            '*' {
                response.addHeader(HttpHeaders.LOCATION,
                        grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
                                            namespace: hasProperty('namespace') ? this.namespace : null ))
                if (actionName == 'save') {
                    respond instance, [status: CREATED]
                } else {
                    respond instance, [status: OK]
                }
            }
        }
    }

    def create() {
// Thread.currentThread().sleep(1000)
        if(handleReadOnly()) {
            return
        }
        if (isAjax()) {
            respond createResource()

        } else {
            render view: 'create', model: [ (resourceName): createResource() ]
        }
    }

    @Transactional
    def save() {
        if(handleReadOnly()) {
            return
        }
        
        T instance = createResource()
        instance.validate()
        if (! afterPropertiesValidate(instance, transactionStatus)) {
            return
        }
        if (! persistResource(instance, transactionStatus)) {
            return
        }
        renderSavedPage(instance)
    }

    def edit() {
// Thread.currentThread().sleep(1000)
// response.status = 501
// return
        if(handleReadOnly()) {
            return
        }
        def instance = queryForResource(params?.id)
        if (! instance) {
            flash.message = '資料不存在'
        }
        if (isAjax()) {
            respond instance

        } else {
            render view: 'edit', model: [(resourceName): instance]
        }
    }

   @Transactional
   def update() {
// response.status = 501
// return
        if(handleReadOnly()) {
           return
        }

        T instance = queryForResource(params?.id)
        if (instance == null) {
           transactionStatus.setRollbackOnly()
           notFound()
           return
        }

        instance.properties = getObjectToBind()
        if (! afterPropertiesValidate(instance, transactionStatus)) {
            return
        }
        if (! persistResource(instance, transactionStatus)) {
            return
        }
        renderSavedPage(instance)
   }

    @Transactional
    def delete() {
        if(handleReadOnly()) {
            return
        }

        T instance = queryForResource(params?.id)
        if (instance == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        def isDEL = false
        def errorMessage = null

        try {
            // instance.delete flush:true
            deleteResource(instance)
            isDEL = true

        } catch (e) {
            errorMessage = e.message
        }

        if (! isDEL) {
// println "delete fail: $errorMessage"
            transactionStatus.setRollbackOnly()

            if (isAjax()) {
                respond ( errors: errorMessage )

            } else { // 配合 JS
                // if (request.getHeader('callback')) {
                    render ( [errors: errorMessage] as JSON )
                // } else {
                //     flash.errors = errorMessage
                //     render view: (actionName == 'save' ? 'create' : 'edit'), model: [ (resourceName): instance ]
                // }
            }
            return
        }

        // 配合 JS
        if (params?.cb) {
            render template: getDeletPage(),
                model: [callback: params.cb, result: [id: params.id, status: NO_CONTENT.value(), message: '已刪除']]
        } else {
            if (params?.format || request.format != 'all') {
                render status: NO_CONTENT // NO CONTENT STATUS CODE

            } else {
                flash.message = '已刪除'
                redirect controller: resourceName, action: 'show', id: instance.id
            }
//             request.withFormat {
//                 form multipartForm {
//                     // flash.message = message(code: 'default.deleted.message', args: [message(code: "${resourceClassName}.label".toString(), default: resourceClassName), instance.id])
//                     // redirect action: 'index', method: 'GET'
//                     flash.message = '已刪除'
//                     redirect controller: resourceName, action: 'show', id: instance.id
//                 }
//                 '*'{ render status: NO_CONTENT } // NO CONTENT STATUS CODE
//             }
        }
    }

    protected void notFound() {
// log.debug "request.getHeader('callback'): ${request.getHeader('callback')}"
// log.debug "request.format: ${request.format}"
// log.debug "params[format]: ${params['format']}"

        if (isAjax()) {
        // if (params?.format || request.format != 'all') {
            render status: NOT_FOUND

        } else { // 配合 JS
            // def theMessage = message(code: 'default.not.found.message', default: '資料不存在',
            //     args: [ message(code: "${resourceName}.label", default: resourceName), params.id ])
            def theMessage = '資料不存在'

            if (request.getHeader('callback') || params?.cb) {
                if (actionName == 'delete') {
                    flash.errors = theMessage
                    render template: getDeletPage(),
                        model: [callback: params.cb, result: [id: params.id, status: NOT_FOUND.value(), message: theMessage]]
                } else {
                    response.status = NOT_FOUND.value()
                    render theMessage
                }

            } else {
                if (actionName == 'show') {
                    flash.errors = theMessage

                } else {
                    flash.errors = theMessage
                    // redirect action: 'index', method: 'GET'
                    redirect controller: resourceName, action: 'show', id: params?.id
                   // render view: 'show', id: params?.id
                }
            }
        }

//         request.withFormat {
//             form multipartForm {
//                 // 配合 JS
//                 if (request.getHeader('callback') || params?.cb) {
//                     response.status = NOT_FOUND.value()
//                     render '資料不存在'

//                 } else {
//                     flash.message = message(code: 'default.not.found.message', args: [message(code: '${propertyName}.label', default: '${className}'), params.id])
//                     // redirect action: 'index', method: 'GET'
//                     redirect controller: resourceName, action: 'show', id: params?.id
//                 }
//             }
//             '*'{
//                 render status: NOT_FOUND
//             }
//         }
    }

    protected T saveResource(T resource) {
        resource.save flush: true
    }

    protected deleteResource(T resource) {
        resource.delete flush: true
    }

    protected String getDeletPage() {
        return '/layouts/deleted'
    }
}
