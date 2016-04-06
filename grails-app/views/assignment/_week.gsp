<%
def calendar = Calendar.instance
calendar.setWeekDate(assignment.year, assignment.week, 1)
def firstDate = calendar.time
def lastDate = firstDate + 6
def sdf = new java.text.SimpleDateFormat('YYYY/MM/dd')
%>
<div class="input-group disabled">
	<label>第<%=assignment.week%>週</label>
	<input type="text" value="${sdf.format(firstDate)} ~ ${sdf.format(lastDate)}" class="form-control" disabled>
</div>