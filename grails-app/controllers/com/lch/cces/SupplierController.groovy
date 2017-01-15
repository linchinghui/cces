package com.lch.cces

import com.lch.aaa.*

class SupplierController extends BaseController<Supplier> {

    static namespace = Application.NAMESPACE_API

	SupplierController() {
        super(Supplier)
    }
}
