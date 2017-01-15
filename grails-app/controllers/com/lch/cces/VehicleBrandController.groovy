package com.lch.cces

import com.lch.aaa.*

class VehicleBrandController extends BaseController<VehicleBrand> {

    static namespace = Application.NAMESPACE_API

    def vehicleBrandService

	VehicleBrandController() {
        super(VehicleBrand)
    }

    protected final VehicleBrand queryForResource(id) {
    	return vehicleBrandService.get(id)
    }

    protected final VehicleBrand saveResource(VehicleBrand vehicleBrand) {
        return vehicleBrandService.save(vehicleBrand)
    }

    protected final deleteResource(VehicleBrand vehicleBrand) {
        vehicleBrandService.delete(vehicleBrand)
    }

}
