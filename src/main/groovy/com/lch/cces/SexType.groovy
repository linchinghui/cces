package com.lch.cces

public enum SexType {
	MALE('男'),
	FEMALE('女');

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

	public String toString() {
		"$desc($id)"
	}
}
