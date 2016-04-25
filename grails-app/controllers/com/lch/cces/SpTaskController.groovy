package com.lch.cces

import java.text.*
import com.lch.aaa.*

class SpTaskController extends BaseController<SpTask> {

    static namespace = Application.NAMESPACE_API

    SpTaskController() {
        super(SpTask)
    }

    private void resolveParameters(params) {
        def compIds = params?.id?.split('\\|')

        if (compIds?.size() >= 1) {
            if (compIds[0] != 'null') {
                if (params?.projectId == null) {
                    params['projectId'] = compIds[0]
                }
            } else {
                params.remove('id') // to identify 'CREATE'
            }

            if (compIds?.size() >= 2 && compIds[1] != 'null' && params?.workedDate == null) {
                params['workedDate'] = compIds[1]
            }
            if (compIds?.size() >= 3 && compIds[2] != 'null' && params?.employeeId == null) {
                params['employeeId'] = compIds[2]
            }
		}

    	if (params?.workedDate) {
			params['workedDate'] = params.workedDate.take(10).replaceAll('-','\\/')
        }
    }

    private List<SpTask> listAllSpTasks(Map params) {
        resolveParameters(params)

        return SpTask.where {
            if (params?.projectId)  { project.id   == params.projectId }
            if (params.workedDate)  { workedDate   == new SimpleDateFormat('yyyy/MM/dd').parse(params.workedDate) }
            if (params?.employeeId) { employee.id  == params.employeeId }
        }.list(params)
    }

    protected final List<SpTask> listAllResources(Map params) {
        listAllSpTasks(params)
    }

    protected final SpTask queryForResource(Serializable id) {
        listAllSpTasks(params)[0]
    }

    private void prepareDefaultValue(props) {
    	if (props.project) {
	        props.constructPlace = props.project.constructPlace
	        props.equipment      = props.project.description
	        props.constructType  = props.project.constructType // substitute of constructCode
	    //  props.note           = props.project.note
    	}
    }

    protected final SpTask createResource(Map params) {
        resolveParameters(params)
        def props = params

        if (params?.projectId &&
            params?.projectId != 'null') {
            props.project = Project.get(params.projectId)
            props.remove('projectId')
        }
        if (params.workedDate &&
        	params?.workedDate != 'null') {
        	props.workedDate = new SimpleDateFormat('yyyy/MM/dd').parse(params.workedDate)
    	}
        if (params?.employeeId &&
            params?.employeeId != 'null') {
            props.employee = Worker.get(params.employeeId)
            props.remove('employeeId')
        }

        prepareDefaultValue(props)
		return resource.newInstance(props)
    }

    protected final SpTask createResource() {
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
