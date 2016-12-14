package com.lch.cces

import groovy.transform.CompileStatic

public enum SexType {
	MALE('男'),
	FEMALE('女');

	private static class Holder {
		static List<String> ids
		// static List<String> names
		static Map<String, String> map

		static {
			def valList = SexType.values()
			ids = valList*.getId()
			// names = valList*.name()
			map = valList.inject([:]) { res, itm ->
				res += [(itm.id): itm.desc]
			}
		}
	}

	@CompileStatic
	static List<String> ordinals() {
		return Holder.ids
	}

	// @CompileStatic
	// static List<String> names() {
	// 	return Holder.names
	// }

	@CompileStatic
	static Map<String, String> map() {
		return Holder.map
	}

	// @CompileStatic
	static SexType salvage(def type) {
		if (type == null) {
			return null
		}

		String val = type as String
		int idx = -1

		if (val.size() == 1) {
			idx = ordinals().findIndexOf{ it == val.toUpperCase() }

		} else {
			try {
				return (val.toUpperCase() as SexType)

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

	SexType(def desc) {
		this.id = name()[0] // .toUpperCase()
		this.desc = desc
	}

	String getId() {
		this.id
	}

	String getLabel() {
		"$desc($id)"
	}

	public String toString() {
		// "$desc($id)"
		"$id"
	}
}
