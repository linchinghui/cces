
base.roleMap = [
	'ROLE_USER': '閱覽人員',
	'ROLE_FILING': '建檔人員',
	'ROLE_SUPERVISOR': '系統管理員'
]

base.functionList = [
//	[name: 'dbconsole', description: '資料庫主控台'], // icon:'fa fa-database'
//	[name: 'console', description: '系統主控台'], // icon:'fa fa-laptop'

	[name: 'announcement', description: '公告', aided: true],
	[name: 'function', description: '作業項目'],
	[name: 'user', description: '作業帳號'],
	[name: 'role', description: '作業授權-角色'],
	[name: 'privilege', description: '作業授權-權限'],

	[name: 'dynamicEnum', description: '代碼'],
	[name: 'worker', description: '員工資料-員工'],
	[name: 'certificate', description: '員工資料-相關證照', aided: true],
	[name: 'certificateCategory', description: '證照資料-證照類別'],
	[name: 'certificateOrgan', description: '證照資料-證照發照機構', aided: true],
	[name: 'vehicle', description: '車輛資料-車輛'],
	[name: 'vehicleBrand', description: '車輛資料-廠牌', aided: true],
	[name: 'supplier', description: '供應商資料-供應商'],
	// [name: 'supplier', description: '材料表-供應商', aided: true],
	[name: 'material', description: '材料表-材料'],
	[name: 'materialCategory', description: '材料表-類別', aided: true],
	[name: 'materialSupplier', description: '材料表-供應來源', aided: true],

	[name: 'revenue', description: '收款資料'],

	[name: 'project', description: '專案表-專案'],
	[name: 'assignment', description: "人員配置(依專案)-派工"],
	[name: 'assignment2', description: "人員配置(依員工)-派工"],
	[name: 'assignDaily', description: '人員配置-日排班', aided: true],
	[name: 'assignMonthly', description: '人員配置-綜覽', aided: true],
	[name: 'task', description: '一般施作紀錄-施作'],
	[name: 'spTask', description: '園區施作紀錄-施作'],
	[name: 'vehicleMilage', description: '園區施作紀錄-用車', aided: true]
]
