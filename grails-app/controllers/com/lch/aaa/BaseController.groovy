package com.lch.aaa

import grails.converters.*
import grails.rest.RestfulController
import grails.transaction.Transactional
import static org.springframework.http.HttpStatus.*
import org.springframework.http.HttpHeaders

// combine restful
abstract class BaseController<T> extends RestfulController<T> {

		def authenticationService
		/*
		 * constructor
		 */
		BaseController(Class<T> type) {
				super(type) // super(getClass().getTypeParameters()[0].getGenericDeclaration()) ?
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

		/*
		 * helper
		 * TODO:
		 */
		protected final boolean isAjax() {
				request['isAjax'] // request.getHeader('X-Requested-With') == 'XMLHttpRequest'
		}

    def final addError = { field, message ->
        if (flash.errors) {
            flash.errors.put(field, message)
        } else {
            flash.errors = [(field): message]
        }
    }

    def final addMessage = { message ->
        flash.message = message
    }

		/*
		 * authentication and authorization
		 */
		protected final def retrievePrivileges() {
				request['privileges'] ?: ( request['privileges'] =
						authenticationService.privileges.find {
								it.function.id == resourceName.toLowerCase() // by resource
						}
				)
		}

		protected def boolean isReadAuthorized() {
				retrievePrivileges()?.canRead
		}

		protected def boolean isWriteAuthorized() {
				retrievePrivileges()?.canWrite
		}

		protected def boolean isDeleteAuthorized() {
				retrievePrivileges()?.canDelete
		}

		private def unAuthorized() {
				commonWarning(UNAUTHORIZED, '無作業權限')
		}

		/*
		 * commons
		 */
 		private def commonWarning(replyCode, message) {
 				if (isAjax()) {
 						render status: replyCode

 				} else { // 配合 JS
 						if (request.getHeader('callback') || params?.cb) {
 								if (actionName == 'delete') {
 										render template: getDeletPage(), model: [callback: params.cb, result: [id: params.id, status: replyCode.value(), message: message]]

 								} else {
 										response.status = replyCode.value()
 										render message
 								}

 						} else {
 								flash.errors = message
								//	if (params?.format || request.format != 'all') {
								// 	} else {
								// 	}
								if (! (actionName in ['index', 'show'])) {
										if (isReadAuthorized()) {
												def url = g.createLink action: 'show', id: params?.id // params: params
												log.debug ("$message! redirect to $url")
												redirect url: url
										} else {
												flash.errors += ';操作將轉回首頁'
												log.debug ("$message! redirect to HOME")
												redirect mapping: 'home'
										}
 								}
 						}
 				}
 		}

    private def boolean afterPropertiesValidate(instance, transactionStatus) {
        def isOK = true

        if (instance.hasErrors()) {
            isOK = false
            transactionStatus.setRollbackOnly()
            // original:
            // respond instance.errors, view:'create' // STATUS CODE 422
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
                    flash.message = (actionName == 'save') ? '已新增' : '已更新';
                    // redirect controller: resourceName, action: 'show', id: instance.id
										def url = g.createLink action: 'show', id: params?.id // params: params
										redirect url: url
                }
            }
            '*' {
                response.addHeader(HttpHeaders.LOCATION,
                        grailsLinkGenerator.link( resource: this.controllerName, action: 'show',id: instance.id, absolute: true, namespace: hasProperty('namespace') ? this.namespace : null ))
                if (actionName == 'save') {
                    respond instance, [status: CREATED]
                } else {
                    respond instance, [status: OK]
                }
            }
        }
    }

    protected def void notFound() {
				commonWarning(NOT_FOUND, '資料不存在')
    }

		/*
		 * CRUD
		 */
		/*
		 * ----- C -----
		 */
    def create() {
				if (! isWriteAuthorized()) {
						unAuthorized()
						return
				}
				if (handleReadOnly()) {
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
				if (! isWriteAuthorized()) {
						unAuthorized()
						return
				}
        if (handleReadOnly()) {
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

		/*
		 * ----- R -----
		 */
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
				boolean hasReadAuth = isReadAuthorized()
				if (! hasReadAuth) {
						unAuthorized()
						// return
				}

        params.max = Math.min(max ?: 10, 100)
        def countName = "${resourceName}Count".toString()
        // def listName = "${resourceName}List".toString() // "${resourceName}List" to represent dataList by default
				// Thread.currentThread().sleep(1000)
				// flash.error="test flash"
				// response.status = 404

        if (isAjax()) {
            def dataList = hasReadAuth ? listAllResources(params) : []

            if (params?.draw) { // integrate with DataTables JS
                def dataCount = hasReadAuth ? countResources() : java.math.BigInteger.ZERO
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
                respond dataList
            }

        } else {
            if (params?.format in ['all', 'form', null]) { // (params?.format != null || request.format != 'all')
                // just render viewer (and use ajax to access data above)
                render view: 'list' //, model: [ (listName): dataList, (countName): dataCount ]

            } else {
                def dataList = hasReadAuth ? listAllResources(params) : []
                def dataCount = hasReadAuth ? countResources() : java.math.BigInteger.ZERO
                respond dataList, model: [ (countName): dataCount ]
            }
        }
    }

    def show() {
				if (! isReadAuthorized()) {
						unAuthorized()
						// return
				}

        T instance = queryForResource(params?.id)

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

		/*
		 * ----- U -----
		 */
		def edit() {
				// Thread.currentThread().sleep(1000)
				// response.status = 501
				// return
				if (! isWriteAuthorized()) {
						unAuthorized()
						return
				}
        if (handleReadOnly()) {
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
				if (! isWriteAuthorized()) {
						unAuthorized()
						return
				}
        if (handleReadOnly()) {
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

		/*
		 * ----- D -----
		 */
  	@Transactional
    def delete() {
				if (! isDeleteAuthorized()) {
						unAuthorized()
						return
				}
        if (handleReadOnly()) {
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
            transactionStatus.setRollbackOnly()

            if (isAjax()) {
                respond ( errors: errorMessage )

            } else { // 配合 JS
                // if (request.getHeader('callback')) {
                    	render ( [errors: errorMessage] as JSON )
                // } else {
								// 		flash.errors = errorMessage
								// 		render view: (actionName == 'save' ? 'create' : 'edit'), model: [ (resourceName): instance ]
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
                // redirect controller: resourceName, action: 'show', id: instance.id
								def url = g.createLink action: 'show', id: params?.id // params: params
								redirect url: url
            }
        }
    }
}
