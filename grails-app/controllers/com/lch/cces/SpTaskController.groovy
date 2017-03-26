package com.lch.cces

import java.text.*
import com.lch.aaa.*
import java.util.Calendar

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
		if (params?.constructNo) {
			params['constructNo'] = URLDecoder.decode(params['constructNo'])
		}
		if (params?.workedDate && params?.workedDate != request['workedDate']) {
			params['workedDate'] = URLDecoder.decode(params.workedDate).take(10).replaceAll('-','\\/')
			request['workedDate'] = new SimpleDateFormat('yyyy/MM/dd').parse(params.workedDate)
		}
	}

	private List<SpTask> listAllSpTasks(Map params) {
		resolveParameters(params)

		if (params?.embed == 'true') { // list all
			params.remove('max')
			params.remove('offset')
		}
		return SpTask.where {
			if (params?.projectId)   { project.id  == params.projectId }
			if (params?.constructNo) { equipment   == params.constructNo }
			if (params?.workedDate)  { workedDate  == request['workedDate'] }
			if (params?.employeeId)  { employee.id == params.employeeId }
		}.list(params)
	}

	@Override
	protected final List<SpTask> listAllResources(Map params) {
		def spTasks = listAllSpTasks(params)
		def assignTasks = null

		if (params?.embed == 'true') { // project-id and work-date must not be null
			def calendar = Calendar.instance
			calendar.setTime(request['workedDate'])
			def year = calendar.get(Calendar.YEAR)
			def month = calendar.get(Calendar.MONTH) // +1
			def dx = calendar.get(Calendar.DAY_OF_MONTH) // -1

			def cloneTask = createResource(params)
			// def theProject = cloneTask.project
			def theProjectId = cloneTask.projectId
			cloneTask.project = null

			assignTasks = Assignment.where {
				notIn 'employee', SpTask.where {
					// project == theProject
					project.id == theProjectId
					workedDate == request['workedDate']
				}.employee

				// eq ('project', theProject)
				eq ('project.id', theProjectId)
				eq ('year',  year)
				eq ('month', month + 1)
				eq ("d$dx",  true)

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

	@Override
	protected final SpTask queryForResource(Serializable id) {
		listAllSpTasks(params)[0]
	}

	@Override
	protected final SpTask createResource() {
		return createResource(params)
	}

	@Override
	protected final SpTask createResource(Map params) {
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
		if (params.workedDate &&
			params?.workedDate != 'null') {
			props.workedDate = request['workedDate']
		}
		if (params?.employeeId &&
			params?.employeeId != 'null') {
			props.employee = Worker.get(params.employeeId)

			props.remove('employeeId')
		}
		// default value
		if (props.project) {
			if (! props.constructPlace)
				props.constructPlace = props.project.constructPlace
			if (! props.equipment)
				props.equipment      = props.project.constructNo
			// if (! props.constructCode )
			// 	props.constructCode  = props.project.constructCode
			if (! props.constructType)
				props.constructType  = props.project.constructType
			// if (! props.note)
			// 	props.note           = props.project.note
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

		if (request['workedDate']) {
			params.workedDate = request['workedDate']
		}
		super.update()
	}
}
