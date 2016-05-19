

<!DOCTYPE html>
<html>
    <head>
        <title>CCES - ${pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <asset:stylesheet src="form/pick"/>
    </head>
    <body>
      <g:form method="POST" role="form" class="form-horizontal" name="pickForm"
          enctype="multipart/form-data" controller="pick" action="upload">
        <div class="fileinput fileinput-new" data-provides="fileinput">
          <span class="fileinput-new thumbnail">
            <img data-src="holder.js/44x44"/>
          </span>
          <span class="fileinput-preview fileinput-exists thumbnail">
          </span>
          <span>
            <span class="btn btn-default btn-file">
              <span class="fileinput-new">選擇</span>
              <span class="fileinput-exists">重選</span>
              <input type="file" name="photo"/>
            </span>
            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">移除</a>
          </span>
        </div>
        <fieldset class="buttons">
            <input class="upload btn btn-success" type="submit" value="確認" />
        </fieldset>
      </g:form>

      <asset:javascript src="form/pick"/>
  </body>
</html>
