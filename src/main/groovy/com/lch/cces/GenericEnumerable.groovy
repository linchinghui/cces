
package com.lch.cces

// import java.lang.reflect.*
// import groovy.transform.SelfType

// @SelfType(Enum)
trait GenericEnumerable<T extends Enum<T>> {
	static String label() {
		return 'NA'
	}

	static int keyLength() {
		return 1
	}

	static def ordinals() {
		return this.values()*.getId()
	}

	static def map() {
		return this.values().inject([:]) { res, itm ->
			res += [(itm.id): itm.desc]
		}
	}

	static <T extends Enum<T>> T salvage(def type) {
		if (type == null) {
			return null
		}

		String val = type as String
		int idx = -1

		if (val.size() <= keyLength()) {
			idx = ordinals().findIndexOf {
				it == val.toUpperCase()
			}
		} else {
			try {
				return (val.toUpperCase() as T)
			} catch (e) {
				// by default: idx == -1
			}
		}
		return idx >=0 ? this.values()[idx] : null;
	}

	/*
	 *
	 */
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

	public String toString() {
		"$id" // "$desc"
	}

	// private Class<T> inferedClass
	//
    // public Class<T> getGenericClass() {
    //     inferedClass ?: (
    //         /*Type*/def mySUper = getClass().getGenericSuperclass()
    //         /*Type*/def myType = ((ParameterizedType)mySUper).getActualTypeArguments()[0]
    //         inferedClass = Class.forName(myType.toString().split(" ")[1])
    //     )
    // }
}
