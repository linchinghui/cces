package com.lch.cces

public enum ProjectType implements GenericEnumerable<ProjectType> {
	// HOURLY('點工'),
	// SOLICIT('攬工'),
	// MONTHLY('包月試作'),
	// ORIGINAL('委外'),
	// OTHER('其他');

	static constraints = {
		name	blank: false, nullable: false, maxSize: 10
		desc	blank: false, nullable: false, maxSize: 20
	}

	static String label() {
		'工作型態'
	}

	static int keyLength() {
		return 3
	}

	static ProjectType salvage(def type) {
		salvage(type, ProjectType)
	}

	// private String id
	// private String desc
	ProjectType(String desc) {
		init(desc)
	}

}
