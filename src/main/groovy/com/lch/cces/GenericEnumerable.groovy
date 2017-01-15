
package com.lch.cces

import java.lang.reflect.*
// import org.codehaus.groovy.runtime.typehandling.DefaultTypeTransformation
// import org.slf4j.Logger
import org.slf4j.LoggerFactory
// import groovy.transform.SelfType

// @SelfType(Enum)
trait GenericEnumerable<T extends Enum<T>> {
	static String label() {
		return 'NA'
	}

	static int keyLength() {
		return 1
	}

	static def map() {
		return this.values().inject([:]) { res, itm ->
			res += [(itm.id): itm.desc]
		}
	}

	static <T extends Enum<T>> T salvage(def type, Class<T> classType) {
		if (type == null) {
			return null
		}

		String val = type as String
		int idx = -1

		if (val.size() <= keyLength()) {
			idx = this.values()*.getId().findIndexOf {
				it == val.toUpperCase()
			}
		} else {
			try {
				// return (T) DefaultTypeTransformation.castToType(val.toUpperCase(), classType)
				return (T) Enum.valueOf(classType, val.toUpperCase())
			} catch (e) {
				LoggerFactory.getLogger(classType).error e.message
				// by default: idx == -1
			}
		}

		return idx >=-1 ? this.values()[idx] : null;
	}


	String id
	String desc

	void init(def description) {
		id = name()[0..(keyLength()-1)]
		desc = description
	}

	String getId() {
		id
	}

	String getLabel() {
		"$id-$desc"
	}

// TODO: testing ...
	// public String toString() {
	// 	"$id" // "$desc"
	// }
}
