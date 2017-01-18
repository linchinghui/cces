<div class="box">
  <div class="box-header"></div>
  <div class="box-body">
	<table id="list-${type}Type" class="table table-bordered table-hover">
	  <thead>
		<tr>
		  <th></th>
		  <th>代碼</th>
		  <th>說明</th>
		</tr>
	  </thead>
	  <tbody>
		<g:each var="type" in="${list}">
		  <tr>
			<td>${type.name[0..(keyLength-1)]}</td><td>${type.name}</td><td>${type.desc}</td>
		  </tr>
		</g:each>
	  </tbody>
	</table>
  </div>
</div>
