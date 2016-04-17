<%
def calendar = Calendar.instance
def firstDate
def lastDate
def sdf
if (assignment.year && assignment.week) {
	calendar.setWeekDate(assignment.year, assignment.week, 1)
	firstDate = calendar.time
	lastDate = firstDate + 6
	sdf = new java.text.SimpleDateFormat('YYYY/MM/dd')
}
%>
<div class="input-group disabled">
	<label>第<%=assignment.week%>週</label>
	<input type="text" value="${sdf?.format(firstDate)} ~ ${sdf?.format(lastDate)}" class="form-control" disabled>
</div>