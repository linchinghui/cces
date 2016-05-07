
base.roleMap = [
	'ROLE_USER': '閱覽人員',
	'ROLE_FILING': '建檔人員',
	'ROLE_SUPERVISOR': '系統管理員'
]

base.functionList = [
//	[name: 'dbconsole', description: '資料庫主控台'], // icon:'fa fa-database'
//	[name: 'console', description: '系統主控台'], // icon:'fa fa-laptop'

	[name: 'function', description: '作業項目'],
	[name: 'user', description: '帳號/角色'], // '使用者'
	[name: 'role', description: '角色/授權'],
	[name: 'privilege', description: '作業權限'],

	[name: 'worker', description: '人員資料'],
	[name: 'vehicle', description: '車輛資料'],
	[name: 'vehicleBrand', description: '車輛廠牌', aided: true],
	[name: 'material', description: '材料表'],
	[name: 'materialCategory', description: '材料類型', aided: true],

	[name: 'project', description: '專案表'],
	[name: 'assignment', description: '人員配置/派工'],
	[name: 'task', description: '一般作業登錄'],
	[name: 'spTask', description: '園區作業登錄'],
	[name: 'vehicleMilage', description: '用車', aided: true]
]
