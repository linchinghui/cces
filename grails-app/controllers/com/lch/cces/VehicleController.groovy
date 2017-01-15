package com.lch.cces

import com.lch.aaa.*

class VehicleController extends BaseController<Vehicle> {

    static namespace = Application.NAMESPACE_API

	VehicleController() {
        super(Vehicle)
    }
}
