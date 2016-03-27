package com.lch.cces

public enum PlateType {
	OLV('自用-小型'), // Ordinary light vehicles, 自用 客車/貨車
	BLV('營業-小型'), // Business light vehicles, 營業用 客車/貨車/租賃車
	OHV('自用-大型'), // Ordinary heavy vehicles, 自用 客車/貨車/拖車
	BHV('營業-大型'), // Business heavy vehicles, 營業用 客車/交通車/貨車/拖車/曳引車
	LMC('重型-機車'), // Light motorcycles
	HMC('輕型-機車'); // Heavy motorcycles

	/*
	 * 
	 */
	private desc

	PlateType() {
		this(name())
	}

	PlateType(def desc) {
		this.desc = desc?.toLowerCase().capitalize()​
	}

	public String toString() {
		name() + " - " + desc
	}
}