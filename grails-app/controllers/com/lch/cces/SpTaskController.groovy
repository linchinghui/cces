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
		params?.id?.split('\\|')?.eachWithIndex { fld, idx ->
			if (fld != 'null') {
				def fldName = idx == 0 ? 'projectId' : idx == 1 ? 'workedDate' : 'employeeId'; // == 2
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
		return SpTask.where { // use Hibernate Restrictions instead of =~/==~ where cause table join,
			if (params?.'s:project')	{ ilike ('project.id', params.'s:project') } // as col =~ val (%...% included)
			if (params?.projectId)		{ eq ('project.id', params.projectId) }
			if (params?.constructNo)	{ eq ('equipment', params.constructNo) }
			if (params?.constructNo)	{ project { eq ('constructNo', params.constructNo) } }
			if (params?.workedDate)		{ eq ('workedDate', request['workedDate']) }
			if (params?.'s:employee')	{ ilike ('employee.id', params.'s:employee') } // as col =~ val (%...% included)
			if (params?.employeeId)		{ eq ('employee.id', params.employeeId) }
		}.list(params)
	}

	@Override
	protected final List<SpTask> listAllResources(Map params) {
		def spTasks = listAllSpTasks(params)
		def assignTasks = null

		if (params?.embed == 'true' && request['workedDate']) { // project-id and work-date must not be null
			def calendar = Calendar.instance
			calendar.setTime(request['workedDate'])
			def year = calendar.get(Calendar.YEAR)
			def month = calendar.get(Calendar.MONTH) // +1
			def dx = calendar.get(Calendar.DAY_OF_MONTH) // -1

			def cloneTask = createResource(params)
			def theProjectId = cloneTask.projectId
			// cloneTask.project = null // (which is part of ID)

			assignTasks = Assignment.where {
				notIn 'employee', SpTask.where {
					eq ('project.id', theProjectId)
					eq ('workedDate', request['workedDate'])
				}.employee

				eq ('project.id', theProjectId)
				eq ('year',  year)
				eq ('month', month + 1)
				eq ("d$dx",  true)

			}.collect {
				def task = new SpTask(cloneTask.properties)
				// TEST:
				task.workedDate = null
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
			if (! props.constructPlace)	{ props.constructPlace = props.project.constructPlace }
			if (! props.constructType)	{ props.constructType  = props.project.constructType }
			if (! props.equipment)		{ props.equipment      = props.project.constructNo }

			// if (! props.constructCode )		{ props.constructCode  = props.project.constructCode }
			// if (! props.note)			{ props.note           = props.project.note }
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
