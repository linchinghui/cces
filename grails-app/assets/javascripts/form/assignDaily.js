//= require_self

var dailyDataList;

function getDailyParameters(params) {
	var monthYear = serverParams2.assignMonth.val().split('/');
	var qryParams = {
		employeeId: serverParams2.worker,
		year: monthYear[0],
		month: monthYear[1]
	};
	if (params) {
		$.extend(qryParams, params);
	}
	return qryParams;
}

function createDailyTable() {

}

function initializeDaily() {
	if (serverParams2.embed) {
		$(window).on('criterionChanged', function(evt) {
			serverParams2.assignMonth = evt.state.assignMonth;
			serverParams2.worker = evt.state.worker;
			// reloadDataTables(dailyDataList);
		});
	}

	createDailyTable();
}
