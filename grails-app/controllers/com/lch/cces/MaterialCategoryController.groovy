package com.lch.cces

import com.lch.aaa.*

class MaterialCategoryController extends BaseController<MaterialCategory> {

    static namespace = Application.NAMESPACE_API

    def materialCategoryService

	MaterialCategoryController() {
        super(MaterialCategory)
    }

    protected final MaterialCategory queryForResource(id) {
    	return materialCategoryService.get(id)
    }

    protected final MaterialCategory saveResource(MaterialCategory materialCategory) {
        return materialCategoryService.save(materialCategory)
    }

    protected final deleteResource(MaterialCategory materialCategory) {
        materialCategoryService.delete(materialCategory)
    }

}
