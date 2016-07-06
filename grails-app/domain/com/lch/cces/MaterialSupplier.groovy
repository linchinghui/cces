package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/materialSuppliers', superClass = MaterialSupplierController)
class MaterialSupplier implements Serializable, Comparable<MaterialSupplier> {

	Material			material		// 材料
	Supplier			supplier		// 供應商
	@BindingFormat("yyyy/MM/dd'Z'")
	Date				purchasedDate	// 購買日期
	BigDecimal			purchasedPrice	// 購買價格
	String				brand			// 廠牌
	String				saleman			// 業務員
	String				phoneNo			// 電話
	String				faxNo			// 傳真電話

    static constraints = {
		// material		blank: false, nullable: false
		// supplier		blank: false, nullable: false
		purchasedDate	blank: true, nullable: true
		purchasedPrice	blank: true, nullable: true, size: 0..999999, min: BigDecimal.ZERO
		// brand		blank: true, nullable: true, maxSize: 20
		brand			blank: false, nullable: false, maxSize: 20
		saleman			blank: true, nullable: true, maxSize: 10
		phoneNo			blank: true, nullable: true, maxSize: 12
		faxNo			blank: true, nullable: true, maxSize: 12
    }

	static mapping = {
		version			false
		sort			'id'

		// 有可能同一個 supplier 提供多個品牌報價
		id				composite: ['material', 'supplier', 'brand']
	}

	public String getId() {
		"${material?.id}|${supplier?.id}|$brand"
	}
	// public void setId(String _id) {
	// }

	public String toString() {
		"${material?.name}:${supplier?.name}:${brand})"
	}

	public int compareTo(def other) {
		return materialId <=> other?.materialId ?:
			supplierId <=> other?.supplierId ?:
			brand <=> brand
	}
}
