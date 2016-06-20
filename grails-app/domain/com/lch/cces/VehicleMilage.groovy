package com.lch.cces

import grails.rest.Resource
import org.grails.databinding.BindingFormat

@Resource(uri = '/api/vehicleMilages', superClass = VehicleMilageController)
class VehicleMilage implements Serializable, Comparable<VehicleMilage> {

	Project				project			// 專案(一般,園區)
	@BindingFormat("yyyy/MM/dd'Z'")
	Date				dispatchedDate	// 施工日期(用車日期)
	Vehicle				vehicle			// 車輛
	Integer				km = 0			// 里程數(公里)

    static constraints = {
		project			blank: false, nullable: false
		dispatchedDate	blank: false, nullable: false
		vehicle			blank: false, nullable: false
		km				blank: false, nullable: false, min: 1
    }

	static mapping = {
		version			false

		id				composite: ['project', 'dispatchedDate', 'vehicle']
	}

	public String getId() {
		"${project?.id}|${dispatchedDate?.format('yyyy-MM-dd')}|${vehicle?.id}"
	}

	// public void setId(String _id) {
	// }

	public String toString() {
		"${project?.id}:${dispatchedDate?.format('yyyy-MM-dd')}:${vehicle?.id}"
	}

	public int compareTo(def other) {
		return projectId <=> other?.projectId ?:
			dispatchedDate <=> other?.dispatchedDate ?:
			vehicleId <=> other?.vehicleId
	}

}
