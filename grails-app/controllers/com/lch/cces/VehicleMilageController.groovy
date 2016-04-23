package com.lch.cces

import java.text.*
import com.lch.aaa.*

class VehicleMilageController extends BaseController<VehicleMilage> {

    static namespace = Application.NAMESPACE_API

    VehicleMilageController() {
        super(VehicleMilage)
    }

    private void resolveParameters(params) {
        if (params?.embed == 'true') { // list all
            params.remove('max')
        }

        def compIds = params?.id?.split('\\|')

        if (compIds?.size() >= 1) {
            if (compIds[0] != 'null') {
                if (params?.projectId == null) {
                    params['projectId'] = compIds[0]
                }
            } else {
                params.remove('id') // to identify 'CREATE'
            }

            if (compIds?.size() >= 2 && compIds[1] != 'null' && params?.dispatchedDate == null) {
                params['dispatchedDate'] = compIds[1]
            }
            if (compIds?.size() >= 3 && compIds[2] != 'null' && params?.vehicleId == null) {
                params['vehicleId'] = compIds[2]
            }
        }

    	if (params?.dispatchedDate) {
			params['dispatchedDate'] = params.dispatchedDate.take(10).replaceAll('-','\\/')
    	}
    }

    private List<VehicleMilage> listAllVehicleMilages(Map params) {
        resolveParameters(params)

        return VehicleMilage.where {
            if (params?.projectId)     { project.id     == params.projectId }
            if (params.dispatchedDate) { dispatchedDate == new SimpleDateFormat('yyyy/MM/dd').parse(params.dispatchedDate) }
            if (params?.vehicleId)     { vehicle.id     == params.vehicleId }
        }.list(params)
    }

    protected final List<VehicleMilage> listAllResources(Map params) {
        listAllVehicleMilages(params)
    }

    protected final VehicleMilage queryForResource(Serializable id) {
        listAllVehicleMilages(params)[0]
    }

    protected final VehicleMilage createResource(Map params) {
        resolveParameters(params)
        def props = params

        if (params?.projectId &&
        	params?.projectId != 'null') {
            props.role = Project.get(params.projectId)
            props.remove('projectId')
        }
        if (params.dispatchedDate &&
        	params?.dispatchedDate != 'null') {
        	props.dispatchedDate = new SimpleDateFormat('yyyy/MM/dd').parse(params.dispatchedDate)
    	}
        if (params?.vehicleId &&
        	params?.vehicleId != 'null') {
            props.vehicle = Vehicle.get(params.vehicleId)
            props.remove('vehicleId')
        }

        return resource.newInstance(props)
    }

    protected final VehicleMilage createResource() {
        return createResource(params)
    }

    def edit() {
        resolveParameters(params)

        if (params?.id) {
            super.edit()

        } else {
            redirect action: 'create', params: params
        }
    }
}
