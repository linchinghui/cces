package com.lch.cces

// import groovy.transform.CompileStatic
import com.lch.aid.DynamicEnumMaker

public enum SexType implements GenericEnumerable<SexType> {
	// MALE('男'),
	// FEMALE('女');

	static {
		DynamicEnumMaker.add(SexType, 'MALE', ['男'] as Object[])
		DynamicEnumMaker.add(SexType, 'FEMALE', ['女'] as Object[])
	}

	static SexType salvage(def type) {
		salvage(type, SexType)
	}

	SexType(def desc) {
		// this.id = name()[0] // .toUpperCase()
		// this.desc = desc
		init(desc)
	}

	String getLabel() {
		"$desc($id)"
	}

}
