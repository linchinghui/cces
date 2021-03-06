package com.lch.aaa

import static Application.*
import grails.converters.*

class UserController extends BaseController<User> {

	static namespace = NAMESPACE_API

	UserController() {
		super(User)
	}

	def update() {
		if (params && params.roles == null) {
			params.roles = []
		}
		super.update()
	}

	def changePassword() {
		if (super.authenticationService.isLoggedIn()) {
			flash?.clear()

			// not support changing password with GET method
			// just render default viewer: changePassword.gsp
			if (request.method == 'POST') {
				try	{
					super.authenticationService.changePasswordOnline(params?.password, params?.newPassword)
					addMessage('變更完成')

				} catch (AuthenticationException e) {
					addError('newPassword', e.message)
				}

				if (isAjax()) {
					render ((flash?.errors ? [error: flash.errors.newPassword] : [message: 'OK']) as JSON)
					return
				}
			}

		} else {
			render view: PAGE_ERROR, model: [message: '未登入! 不支援此操作.']
			return
		}

		render view: 'changePassword'
	}
}
