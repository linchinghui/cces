package com.lch.aaa

import static Application.*
import grails.converters.*

class UserController extends BaseController<User> {

	static namespace = NAMESPACE_API
	static allowedMethods = [save: 'POST', update: 'PUT', patch: 'PATCH', delete: 'DELETE', changePassword: ['GET', 'POST']]

	def authenticationService

	UserController() {
		super(User)
	}

	def changePassword() {
		if (authenticationService.isLoggedIn()) {
			flash?.clear()

			// not support changing password with GET method
			// just render default viewer: changePassword.gsp
			if (request.method == 'POST') {
				try	{
					authenticationService.changePasswordOnline(params?.password, params?.newPassword)
					addMessage('變更完成')

				} catch (AuthenticationException e) {
					addError('newPassword', e.message)
				}

				if (isAjax()) {
					render ((flash?.errors ? [error: flash.errors.newPassword] : [message: 'OK']) as JSON)
					return
				}
				// else: render message or error on changePassword.gsp
			}

		} else {
			render view: PAGE_ERROR, model: [message: '未登入! 不支援此操作.']
			return
		}
	}
}
