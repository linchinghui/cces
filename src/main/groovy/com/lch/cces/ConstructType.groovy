package com.lch.cces

public enum ConstructType implements GenericEnumerable<ConstructType> {
	// ELEVATE('高架'),
	// ASSEMBLE('組裝'),
	// INSTALL('裝機'),
	// UNINSTALL('拆機'),
	// TUBE('爐管'),
	// OTHER('其他');

	static String label() {
		'施作方式'
	}

	static int keyLength() {
		return 4
	}

	static ConstructType salvage(def type) {
		salvage(type, ConstructType)
	}

	// private String id
	// private String desc
	ConstructType(def desc) {
	// 	this.id = name()[0..3]
	// 	this.desc = desc
		init(desc)
	}

}
