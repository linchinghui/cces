databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1483252564671-1") {
        dropNotNullConstraint(columnDataType: "varchar(20)", columnName: "construct_no", tableName: "project")
    }
}
