package com.lch.cces

import groovy.transform.CompileStatic

// 施作方式
public enum ConstructType {
	ELEVATE('高架'),
	ASSEMBLE('組裝'),
	INSTALL('裝機'),
	UNINSTALL('拆機'),
	TUBE('爐管'),
	OTHER('其他');

	private static class Holder {
		static List<String> ids
		// static List<String> names
		// static List<Map<String, String>> map
		static Map<String, String> map

		static {
			ids = ConstructType.values()*.getId()
			// names = ConstructType.values()*.name()
			// map = ConstructType.values().collect {
			// 	[(it.id): it.desc]
			// }
			map = ConstructType.values().inject([:]) { res, itm ->
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
	// static List<Map<String, String>> map() {
	static Map<String, String> map() {
		return Holder.map
	}

	// @CompileStatic
	static ConstructType salvage(def type) {
		if (type == null) {
			return null
		}

		String val = type as String
		int idx = -1

		if (val.size() <= 4) {
			idx = ordinals().findIndexOf{ it == val.toUpperCase() }

		} else {
			try {
				return (val.toUpperCase() as ConstructType)

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

	ConstructType(def desc) {
		this.id = name()[0..3]
		this.desc = desc
	}

	String getId() {
		this.id
	}

	String getLabel() {
		"$id-$desc"
	}

	public String toString() {
		// "$desc"
		"$id"
	}
}
