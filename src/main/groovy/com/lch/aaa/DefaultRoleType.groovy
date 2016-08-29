package com.lch.aaa
import groovy.transform.CompileStatic
import org.apache.commons.lang.StringUtils

public enum DefaultRoleType {
	ROLE_USER, ROLE_FILING, ROLE_SUPERVISOR;

	public static final String PREFIX = 'ROLE_'

	private static class RoleTypeHolder {
		static List<String> roleIds
		static List<String> roleNames

		static {
			roleIds = DefaultRoleType.values()*.getId()
			roleNames = DefaultRoleType.values()*.name()
		}
	}

	@CompileStatic
	static List<String> ordinals() {
		return RoleTypeHolder.roleIds
	}

	@CompileStatic
	static List<String> names() {
		return RoleTypeHolder.roleNames
	}

	@CompileStatic
	static DefaultRoleType salvage(Role role) {
		def type = salvage(role.code)
		return type ?: ROLE_USER
	}

	/*
	 * type : 0 ~ 2 ; default=0
	 * type : 'S', 'F', 'U' ; default='U'
	 * type : 'ROLE_SUPERVISOR', 'ROLE_FILING', 'ROLE_USER' ; default='ROLE_USER'
	 */
	@CompileStatic
	static DefaultRoleType salvage(def type) {
		if (type == null) {
			return null
		}

//		return DefaultRoleType.valueOf(code)

		String val = type as String
		int idx = -1

		if (StringUtils.isNumeric(val)) {
			idx = type as int

		} else if (val.size() == 1) {
			idx = ordinals().findIndexOf{ it == val }

		} else {
			try {
				return (val.toUpperCase() as DefaultRoleType)

			} catch (e) {
				// idx == -1
			}
		}

		if (idx < 0 || idx >= values().size()) {
			idx = 0
		}

		return values()[idx]
	}

	/*
	 *
	 */
	private String id

	DefaultRoleType() {
		this.id = springSecurityRoleName()[0].toUpperCase()
	}

	String getId() {
//		name().split('_')[-1][0].toUpperCase()
		this.id
	}

	String springSecurityRoleName() {
		name().split('_')[-1]
	}
}
