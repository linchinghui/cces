
//grails.gorm.default.mapping = {
//	"user-type" type: org.jadira.usertype.dateandtime.joda.PersistentDateTime, class: org.joda.time.DateTime
//	"user-type" type: org.jadira.usertype.dateandtime.joda.PersistentLocalDate, class: org.joda.time.LocalDate
	// … define as many other user type mappings as you need
//}

aaa.menuGroups = [
//	[group: 'debug', description:'系統除錯', icon:'fa fa-bug'],
	[group: 'maintain', description:'系統維護', icon:'fa fa-television', items: [
		[controller: 'announcement', icon: 'fa fa-twitch'],
		[controller: 'function', icon: 'fa fa-list-alt'],
	    [controller: 'user', icon: 'fa fa-users'],
	    [controller: 'role', icon: 'fa fa-unlock']
	]],
	[group: 'filing', description:'資料建檔', icon:'fa fa-files-o', items: [
		[controller: 'dynamicEnum', icon: 'fa fa-list-ol'],
		// [controller: 'certificateCategory', icon: 'fa fa-certificate'],
		[controller: 'worker', icon: 'fa fa-user'],
		[controller: 'vehicle', icon: 'fa fa-bus'],
		// [controller: 'supplier', icon: 'fa fa-ambulance'],
		[controller: 'material', icon: 'fa fa-clipboard']
	]],
	[group: 'project', description:'專案管理', icon:'fa fa-product-hunt', items: [
		[controller: 'project', icon: 'fa fa-wpforms'],
		[controller: 'assignment', icon: 'fa fa-calendar-check-o', params: [by: 'p']],
		[controller: 'task', icon: 'fa fa-gavel'],
		[controller: 'spTask', icon: 'fa fa-building-o']
	]],
	[group: 'accounting', description:'簡易帳務', icon:'fa fa-university', items: [
		[controller: 'revenue', icon: 'fa fa-usd']
	]],
	[group: 'report', description:'統計報表', icon:'fa fa-bar-chart', items: [
	]]
]

aaa.rememberMe.validitySeconds = 604800 // 7 days

cces.images = [
	// size: 500000,
	uriPrefix: [
		image: '/images',
		thumbnail: '/thumbnails'
	],
	persistFolder: (grails.util.Environment.developmentMode ? '/tmp' : '/var/www/cces/images'),
	useCache: true
]
