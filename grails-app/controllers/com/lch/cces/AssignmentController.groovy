package com.lch.cces

import com.lch.aaa.*
import grails.gorm.DetachedCriteria

class AssignmentController extends BaseController<Assignment> {

    static namespace = Application.NAMESPACE_API
	private static final String KEY_CRITERIA_ARRANGE = 'arrangeCriteria'
	private static final String KEY_PARAM_ARRANGE = 'arrangeWeek'

	/*
	 * CRUD
	 */
	AssignmentController() {
        super(Assignment)
    }

    def index(Integer max) {
        if (params?.month != null) {
			listMonthly(max)

        } else {
			super.index(max)
        }
    }

    private void resolveParameters(params) {
        def compIds = params?.id?.split('\\|')

        if (compIds?.size() >= 1) {
            if (compIds[0] != 'null') {
                if (params?.employeeId == null) {
                    params['employeeId'] = compIds[0]
                }
            } else {
                params.remove('id') // to identify 'CREATE'
            }

            if (compIds?.size() >= 2 && compIds[1] != 'null' && params?.projectId == null) {
                params['projectId'] = compIds[1]
            }
            if (compIds?.size() >= 3 && compIds[2] != 'null' && params?.year == null) {
                params['year'] = compIds[2]
            }
            if (compIds?.size() >= 4 && compIds[3] != 'null' && params?.week == null) {
                params['week'] = compIds[3]
            }
        }
    }

    protected final List<Assignment> listAllResources(Map params) {
        listAllAssignments(params)
    }

    protected final Assignment queryForResource(Serializable id) {
        listAllAssignments(params)[0]
    }

    private List<Assignment> listAllAssignments(params) {
        if (log.isTraceEnabled()) log.trace "list assignment(s): ${params}"

        resolveParameters(params)

        return Assignment.where {
            if (params?.employeeId)  { employee.id         == params.employeeId }
			if (params?.projectId)   { project.id          == params.projectId }
			if (params?.constructNo) { project.constructNo == params.constructNo }
            if (params?.year)        { year                == (params.year as int) }
            if (params?.week)        { week                == (params.week as int) }
            if (params._method != 'PUT') {
                if (params?.d0) { d0 == params.d0 }
                if (params?.d1) { d1 == params.d1 }
                if (params?.d2) { d2 == params.d2 }
                if (params?.d3) { d3 == params.d3 }
                if (params?.d4) { d4 == params.d4 }
                if (params?.d5) { d5 == params.d5 }
                if (params?.d6) { d6 == params.d6 }
            }
        }.list(params)
    }

    protected final Assignment createResource(Map params) {
        resolveParameters(params)
        def props = params

        if (params?.employeeId &&
            params?.employeeId != 'null') {
            props.employee = Worker.get(params.employeeId)
            props.remove('employeeId')
        }
        if (params?.projectId &&
            params?.projectId != 'null') {
            props.project = Project.get(params.projectId)
            props.remove('projectId')
        }
		if (params?.constructNo &&
            params?.constructNo != 'null') {
            props.project = Project.findByConstructNo(params.constructNo)
            props.remove('constructNo')
        }

        return resource.newInstance(props)
    }

    protected final Assignment createResource() {
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

    /*
     * project sum-up info
     */
    def sumup() {
        if (log.isTraceEnabled()) log.trace "assignment sum-up: ${params}"

        resolveParameters(params)
        boolean hasReadAuth = isReadAuthorized()
        if (! hasReadAuth) {
            unAuthorized()
            return
        }

        // if (params?.projectId) {
            respond combine4ClndrJS()

        // } else {
        //     response.status = 404
        //     respond ([warning: '未指定專案'])
        // }
    }

    private def combine4ClndrJS() {
        def calendar = Calendar.instance
        def year = params?.year as int
        def week = params?.week as int

        (1..7).inject([]) { result, no ->
            calendar.setWeekDate(year, week, no)

            def cnt = countAssignmentsBy(year, week, no)
            if (cnt > 0) {
                def obj = [date: calendar.time.format('yyyy-MM-dd'), title: cnt]
                result += obj
            }

            result
        }
    }

    private def countAssignmentsBy(year, week, dayNo) {
		new DetachedCriteria(Assignment).count {
			projections {
                groupProperty('year')
                groupProperty('week')
                count()
            }
			if (params?.projectId) {
				project {
                	eq ('id', params.projectId)
				}
            }
			if (params?.constructNo) {
				project {
					eq ('constructNo', params.constructNo)
				}
            }
            eq ('year', year)
            eq ('week', week)
            eq ('d' + (dayNo-1), true)
        }
    }

	/*
	 * list monthly arrangement  *-- no CUD --*
	 */
    private def listMonthly(max) {
        boolean hasReadAuth = isReadAuthorized()
        if (! hasReadAuth) {
            unAuthorized()
            // return
		} else {
			resolveMonthlyParameters(params)
			createMonthlyCriteria(params)
		}

		params.max = Math.min(max ?: 10, 100)

		if (isAjax()) {
			def dataList = hasReadAuth ? listMonthlyArrangement(params) : []

			if (params?.draw) { // integrate with DataTables JS
				def dataCount = hasReadAuth ? countMonthlyArrangement() : java.math.BigInteger.ZERO

				respond (
					draw: params.draw,
					recordsTotal: dataCount,
					recordsFiltered: dataList.size(), // TODO
					data: dataList
				)

			} else {
				respond dataList
			}

		} else {
			def countName = "${resourceName}Count".toString()

			if (params?.format in ['all', 'form', null]) {
				render view: 'listMonthly' //, model: [ (resourceName): createResource() ]

			} else {
				def dataList = hasReadAuth ? listMonthlyArrangement(params) : []
				def dataCount = hasReadAuth ? countMonthlyArrangement() : java.math.BigInteger.ZERO
				respond dataList, model: [ (countName): dataCount ]
			}
		}
    }

	private void resolveMonthlyParameters(params) {
		resolveParameters(params)

		def calendar = Calendar.instance
		def year = params?.year? (params?.year as int) : calendar.weekYear
		def month = params?.month? (params?.month as int) : calendar.get(Calendar.MONTH)

		calendar.set(year, month, 1)
		def criteriaBegin = [:]
		def criteriaEnd = [:]

		criteriaBegin['week'] = calendar.get(Calendar.WEEK_OF_YEAR)
		criteriaBegin['d'] = calendar.get(Calendar.DAY_OF_WEEK)

		calendar.add(Calendar.MONTH,1)
		calendar.add(Calendar.DAY_OF_MONTH ,-1)
		criteriaEnd['week'] = calendar.get(Calendar.WEEK_OF_YEAR)
		criteriaEnd['d'] = calendar.get(Calendar.DAY_OF_WEEK)

		request[KEY_PARAM_ARRANGE] = [begin: criteriaBegin, end:criteriaEnd]

		if (log.isTraceEnabled()) log.trace "1.arrange criteria: ${request[KEY_PARAM_ARRANGE]}"
	}


	private void createMonthlyCriteria(params) {
		request[KEY_CRITERIA_ARRANGE] = {
			if (params?.projectId) {
				project {
					eq ('id', params.projectId)
				}
			}
			if (params?.constructNo) {
				project {
					eq ('constructNo', params.constructNo)
				}
			}
			if (params?.employeeId) {
				employee {
					eq('id', params.employeeId)
				}
			}
			if (params?.year) {
				eq ('year', params.year as int)
			}

			def arrangeRange = request[KEY_PARAM_ARRANGE]
			if (arrangeRange) {
				between ('week', arrangeRange.begin.week, arrangeRange.end.week)
			}
		}
	}

    private def listMonthlyArrangement(params) {
        if (log.isTraceEnabled()) log.trace "2.list monthly arrangement"

		Assignment.where(
			request[KEY_CRITERIA_ARRANGE]

		).list {
			if (params?.max) { max(params.max) }
			if (params?.offset) { offset(params.offset as int) }
			if (params?.sort) { order(params.sort, (params?.order ? params.order : 'asc')) }
		    order('week')

		}.groupBy {
			it."${params?.sort ? params?.sort : 'employee'}"

		}.collect {
			transformMonthly(it)
		}
    }

	private def transformMonthly(personalArranged) {
		def calendar = Calendar.instance
		def criteria = request[KEY_PARAM_ARRANGE]
		def lastWeek = criteria.begin.week
		def employee = personalArranged.key
		def baseFields = [id: '', employee: employee.toString()] // [id: employee.id, employee: employee.empName]
        def lastArranged = personalArranged.value[-1]

		if (log.isTraceEnabled()) log.trace "3.personal arrange: ${lastArranged}"

        def arrangement = personalArranged.value + ( lastArranged.week < criteria.end.week ?
            new Assignment(
				employee: lastArranged.employee,
				project: lastArranged.project,
				year: lastArranged.year,
				week: criteria.end.week)
            : []
		)

        arrangement.inject(baseFields) { result, assign ->
			(lastWeek..assign.week).step(1) { week ->
            	((week <= criteria.begin.week ? criteria.begin.d : 1) ..
				 (week >= criteria.end.week   ? criteria.end.d   : 7)).each { day ->
					calendar.setWeekDate(calendar.weekYear, week, day)
					result +=  [('d'+calendar.get(Calendar.DAY_OF_MONTH)): (week==assign.week ? assign["d${day-1}"] : false)]
            	}
			}
            lastWeek = assign.week + 1
            result
        }
	}

    private def countMonthlyArrangement() {
		if (log.isTraceEnabled()) log.trace "4.count monthly arrangement"

		new DetachedCriteria(Assignment).where(
			request[KEY_CRITERIA_ARRANGE]

		).count {
            projections {
                groupProperty('year')
                groupProperty('employee')
            }
        }
    }
}
