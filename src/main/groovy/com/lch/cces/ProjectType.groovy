package com.lch.cces

import groovy.transform.CompileStatic

public enum ProjectType {
	HOURLY('點工'),
	SOLICIT('攬工'),
	MONTHLY('包月試作'),
	ORIGINAL('委外'),
	OTHER('其他');

	private static class Holder {
		static List<String> ids
		static List<String> names
		static Map<String, String> map

		static {
			map = ProjectType.values().inject([:]) { res, itm ->
				res += [(itm.id): itm.desc]
			}
			ids = ProjectType.values()*.getId()
			names = ProjectType.values()*.name()
		}
	}

	@CompileStatic
	static List<String> ordinals() {
		return Holder.ids
	}

	@CompileStatic
	static List<String> names() {
		return Holder.names
	}

	@CompileStatic
	static Map<String, String> map() {
		return Holder.map
	}

	// @CompileStatic
	static ProjectType salvage(def type) {
		if (type == null) {
			return null
		}

		String val = type as String
		int idx = -1

		if (val.size() <= 3) {
			idx = ordinals().findIndexOf{ it == val.toUpperCase() }

		} else {
			try {
				return (val.toUpperCase() as ProjectType)

			} catch (e) {
				// by default: idx == -1
			}
		}

		return idx >=0 ? values()[idx] : null;
	}

	/*
	 *
	 */
	private String id
	private String desc

	ProjectType(def desc) {
		this.id = name()[0..2]
		this.desc = desc
	}

	String getId() {
		this.id
	}

	public String toString() {
		"$desc"
	}
}
