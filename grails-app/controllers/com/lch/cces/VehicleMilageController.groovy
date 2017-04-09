package com.lch.cces

import java.text.*
import com.lch.aaa.*

class VehicleMilageController extends BaseController<VehicleMilage> {

	static namespace = Application.NAMESPACE_API

	VehicleMilageController() {
		super(VehicleMilage)
	}

	private void resolveParameters(params) {
		// def compIds = params?.id?.split('\\|')
		//
		// if (compIds?.size() >= 1) {
		// 	if (compIds[0] != 'null') {
		// 		if (params?.projectId == null) {
		// 			params['projectId'] = compIds[0]
		// 		}
		// 	} else {
		// 		params.remove('id') // to identify 'CREATE'
		// 	}
		// 	if (compIds?.size() >= 2 && compIds[1] != 'null' && params?.dispatchedDate == null) {
		// 		params['dispatchedDate'] = compIds[1]
		// 	}
		// 	if (compIds?.size() >= 3 && compIds[2] != 'null' && params?.vehicleId == null) {
		// 		params['vehicleId'] = compIds[2]
		// 	}
		// }
		params?.id?.split('\\|')?.eachWithIndex { fld, idx ->
			if (fld != 'null') {
				def fldName = idx == 0 ? 'projectId' : idx == 1 ? 'dispatchedDate' : 'vehicleId'; // == 2
				if (params?."$fldName" == null) {
					params[fldName] = fld
				}
			} else {
				params.remove('id') // to identify 'CREATE'
			}
		}
		if (params?.projectId) {
			params['projectId'] = URLDecoder.decode(params['projectId'])
		}
		if (params?.constructNo) {
			params['constructNo'] = URLDecoder.decode(params['constructNo'])
		}
		if (params?.dispatchedDate && params?.dispatchedDate != request['dispatchedDate']) {
			params['dispatchedDate'] = URLDecoder.decode(params.dispatchedDate).take(10).replaceAll('-','\\/')
			request['dispatchedDate'] = new SimpleDateFormat('yyyy/MM/dd').parse(params.dispatchedDate)
		}
	}

	private List<VehicleMilage> listAllVehicleMilages(Map params) {
		resolveParameters(params)

		if (params?.embed == 'true') { // list all
			params.remove('max')
			params.remove('offset')
		}
		return VehicleMilage.where {
			if (params?.'s:project')	{ ilike ('project.id', params.'s:project') } // as col =~ val (%...% included)
			if (params?.projectId)		{ eq ('project.id', params.projectId) }
			if (params?.constructNo)	{ project { eq ('constructNo', params.constructNo) } }
			if (params?.dispatchedDate)	{ eq ('dispatchedDate', request['dispatchedDate']) }
			if (params?.'s:vehicle')	{ ilike ('vehicle.id', params.'s:vehicle') } // as col =~ val (%...% included)
			if (params?.vehicleId)		{ eq ('vehicle.id', params.vehicleId) }
		}.list(params)
	}

	@Override
	protected final List<VehicleMilage> listAllResources(Map params) {
		listAllVehicleMilages(params)
	}

	@Override
	protected final VehicleMilage queryForResource(Serializable id) {
		listAllVehicleMilages(params)[0]
	}

	@Override
	protected final VehicleMilage createResource() {
		return createResource(params)
	}

	@Override
	protected final VehicleMilage createResource(Map params) {
		resolveParameters(params)
		def props = params

		if (params?.projectId &&
			params?.projectId != 'null') {
			props.project = Project.get(params.projectId)

			props.remove('projectId')
		}
		if (props.project == null &&
			params?.constructNo &&
			params?.constructNo != 'null') {
			props.project = Project.findByConstructNo(params.constructNo)

			props.remove('constructNo')
			props.remove('projectId')
		}
		if (params.dispatchedDate &&
			params?.dispatchedDate != 'null') {
			props.dispatchedDate = request['dispatchedDate']
		}
		if (params?.vehicleId &&
			params?.vehicleId != 'null') {
			props.vehicle = Vehicle.get(params.vehicleId)

			props.remove('vehicleId')
		}
		return resource.newInstance(props)
	}

	@Override
	def edit() {
		resolveParameters(params)

		if (params?.id) {
			super.edit()

		} else {
			// redirect action: 'create', params: params
			def url = g.createLink action: 'create', params: params
			redirect url: url
		}
	}

	@Override
	def update() {
		resolveParameters(params)

		if (request['dispatchedDate']) {
			params.dispatchedDate = request['dispatchedDate']
		}
		super.update()
	}
}
