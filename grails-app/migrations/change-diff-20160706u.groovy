databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1467808676152-1") {
        addColumn(tableName: "project") {
            column(name: "type", type: "varchar(3)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1467808676152-2") {
        dropColumn(columnName: "project_kind", tableName: "project")
    }
	changeSet(author: "linchinghui (generated)", id: "1467808676152-3") {
        dropColumn(columnName: "project_type", tableName: "project")
    }

}
