import com.lch.aaa.*

import grails.rest.render.json.*
import grails.util.*
import grails.converters.JSON
import org.grails.web.json.JSONException
import org.grails.web.converters.marshaller.ObjectMarshaller
import org.grails.web.converters.marshaller.json.DateMarshaller
import org.grails.web.converters.exceptions.ConverterException
import org.springframework.core.io.ClassPathResource

class BootStrap {

    def init = { servletContext ->

		Environment.executeForCurrentEnvironment {
			production {
				initDb(servletContext)
				registerMarshaller()
			}
			development {
				initDb(servletContext)
				registerMarshaller()
				initForDevelopment(servletContext)
			}
			change {
				// for nothing
			}
		}
	}

	def destroy = {

	}

    private initDb(ctx) {
		// log.info "initialize database ..."
		println "initialize database ..."

		def initData = Application.loadConfiguration('baseData.groovy')

		/*
		 * Role
		 */
		def roleUser
		def roleFiling
		def roleAdmin

		initData?.base?.roleMap?.each { entry ->
			def r = Role.get(DefaultRoleType.salvage(entry.key).id)

			if (null == r) {
				r = new Role(code: entry.key, description: entry.value)
				r.save(flush: true)

				// log.info "create default Role: $r"
				println "create default Role: $r"
			}

			switch (r.type) {
				case DefaultRoleType.ROLE_SUPERVISOR:
					roleAdmin = r
					break

				case DefaultRoleType.ROLE_FILING:
					roleFiling = r
					break

				case DefaultRoleType.ROLE_USER:
					if (! roleUser) {
						roleUser = r
					}
					break
			}
		}

		/*
		 * Account
		 */
		[
			['admin': [roleAdmin, roleFiling, roleUser]],
			['user': [roleUser]]
		].each {
			it.each { user, roles ->
				def io = false
				def u = User.get(user)

				if (! u) {
					u = new User(
						username: user,
						password: user,
						enabled: true,
						accountExpired: false,
						accountLocked: false,
						credentialsExpired: false
					)

					// log.info "create default User: ${u.username}"
					print "create default user: ${u.username}"
					io = true
				}

				def oldRoles = u.roles?:[]
				def newRoles = oldRoles.size() == 0 ? roles :
					roles.findAll { role ->
						! (role in oldRoles)
					}

				if (newRoles?.size() > 0) {
					print "${io ? '' : u.username} with roles: ${newRoles}"
					io = true
					u.roles = (oldRoles + newRoles).unique()
				}
				if (io) {
					println ""
					u.save(flush: true)
				}
			}
		}

		/*
		 * Function
		 */
		initData?.base?.functionList?.each { func ->
			if (! Function.exists(func.name)) {
				new Function(
					name: func.name,
					description: func.description,
					aided: func.aided ?: false
				).save(flush: true)

				// log.info "create Function: ${func.name}"
				println "create Function: ${func.name}"
			}
		}

		/*
		 * Privilege
		 */
		Function.list().each { func ->
			def p = Privilege.where {
				role == roleAdmin && function == func
			}.find()

			if (! p) {
				new Privilege(role: roleAdmin, function: func, canRead: true, canWrite: true).save(flush: true)
			}
		}

    }

    /*
	 * XML, JSON Marshallers<br>
	 */
	private registerMarshaller() {
		// grails.converters.JSON.registerObjectMarshaller(java.sql.Timestamp) {
		// 	// return it ? (it.time as String) : null
		// 	// return it?.format("dd-MM-yyyy")
		// 	return it?.time
		// }
		// grails.converters.JSON.registerObjectMarshaller(new DateMarshaller() {
		// 	@Override
		// 	public void marshalObject(Object date, JSON converter) throws ConverterException {
		// 		try {
		// 			converter.getWriter().value(date.getTime())
		// 		}catch (JSONException e) {
		// 			throw new ConverterException(e)
		// 		}
		// 	}
		// }, 1)
		grails.converters.JSON.registerObjectMarshaller(
			new EnhancedJsonMarshaller()
				.addExclude('password')
				.addExclude('handler')
				// .addExclude('constructType')
				, 2)
		grails.converters.XML.registerObjectMarshaller(
			new EnhancedXmlMarshaller()
				.addExclude('password')
				// .addExclude('constructType')
				, 3)
		// grails.converters.JSON.registerObjectMarshaller(
		// 	new CollectionJsonMarshaller()
		// 		/*.addSupportPackage(...)*/
		// 		, 4)
		grails.converters.XML.registerObjectMarshaller(
			new CollectionXmlMarshaller()
				/*.addSupportPackage(...)*/
				, 5)
	}


	/*
	 * for development only<br>
	 */
    private initForDevelopment(ctx) {

//		println DefaultRoleType.ordinals()
//		println DefaultRoleType.names()

	}
}
