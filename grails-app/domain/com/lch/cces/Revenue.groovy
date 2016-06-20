package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/revenues', superClass = RevenueController)
class Revenue {

    Project				project			// 專案
    String				invoieNo		// 發票號號
    @BindingFormat("yyyy/MM/dd'Z'")
	Date				invoiceDate		// 發票日期
    @BindingFormat("yyyy/MM/dd'Z'")
	Date				recordDate		// 入帳日期
    @BindingFormat("yyyy/MM/dd'T'HH:mm:ss'Z'")
	Date				modifiedDate	// 調改日期
    String				note            // 註記

    static constraints = {
        project			blank: false, nullable: false
        invoieNo		blank: false, nullable: false
        invoiceDate		blank: false, nullable: false
        recordDate		blank: true, nullable: true
        modifiedDate	blank: true, nullable: true
        note           	blank: true, nullable: true, maxSize: 255
    }

    static mapping = {
		version		false
		sort		'id'
	}
}
