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

		if (params?.projectId) {
			params['projectId'] = URLDecoder.decode(params['projectId'])
		}
		if (params?.workedDate && params?.workedDate != params?.parsedDate) {
			params['workedDate'] = URLDecoder.decode(params.workedDate).take(10).replaceAll('-','\\/')
			params['parsedDate'] = new SimpleDateFormat('yyyy/MM/dd').parse(params.workedDate)
		}
	}

	private List<SpTask> listAllSpTasks(Map params) {
		if (params?.embed == 'true') { // list all
			params.remove('max')
			params.remove('offset')
		}
		resolveParameters(params)

		return SpTask.where {
			if (params?.projectId)   { project.id  == params.projectId }
			if (params?.workedDate)  { workedDate  == params.parsedDate }
			if (params?.employeeId)  { employee.id == params.employeeId }
			if (params?.constructNo) { equipment   == params.constructNo }
		}.list(params)
	}

	protected final List<SpTask> listAllResources(Map params) {
		def spTasks = listAllSpTasks(params)
		def assignTasks = null

		if (params?.embed == 'true') { // list all
			//
			// params.project and params.workedDate must not be null
			//
			def calendar = Calendar.instance
			calendar.setTime(params.parsedDate)
			def year = calendar.get(Calendar.YEAR)
			def week = calendar.get(Calendar.WEEK_OF_YEAR)
			def dx   = calendar.get(Calendar.DAY_OF_WEEK) - 1

			def cloneTask = createResource(params)
			def theProject = cloneTask.project
			cloneTask.project = null

			assignTasks = Assignment.where {
				notIn 'employee', SpTask.where {
					project    == theProject
					workedDate == params.parsedDate
				}.employee

				eq    'project',  theProject
				eq    'year',     year
				eq    'week',     week
				eq    "d$dx",     true

			}.collect {
				def task = new SpTask(cloneTask.properties)
				task.employee = it.employee
				return task
			}
		}

		if (assignTasks) {
			spTasks += assignTasks
		}

		return spTasks
	}

	protected final SpTask queryForResource(Serializable id) {
		listAllSpTasks(params)[0]
	}

	private void prepareDefaultValue(props) {
		if (props.project) {
		if (! props.constructPlace) props.constructPlace = props.project.constructPlace
		if (! props.equipment     ) props.equipment      = props.project.constructNo // bug: description
		// if (! props.constructCode ) props.constructCode  = props.project.constructCode
		if (! props.constructType ) props.constructType  = props.project.constructType // substitute of constructCode
		// if (! props.note          ) props.note           = props.project.note
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
			props.workedDate = params.parsedDate
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
			// redirect action: 'create', params: params
			def url = g.createLink action: 'create', params: params
			redirect url: url
		}
	}

	def update() {
		resolveParameters(params)

		if (params?.parsedDate) {
			params.workedDate = params.parsedDate
		}
		super.update()
	}
}
