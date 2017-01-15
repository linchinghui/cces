package com.lch.cces

import com.lch.aaa.*

class MaterialController extends BaseController<Material> {

    static namespace = Application.NAMESPACE_API

	MaterialController() {
        super(Material)
    }
}
