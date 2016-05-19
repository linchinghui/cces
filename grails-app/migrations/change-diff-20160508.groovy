databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1462679600548-1") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_FUNCTIONNAME_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1462679600548-2") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_MATERIAL_CATEGORYCODE_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "material_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1462679600548-3") {
        addUniqueConstraint(columnNames: "series", constraintName: "UC_PERSISTENT_LOGINSSERIES_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "persistent_logins")
    }

    changeSet(author: "linchinghui (generated)", id: "1462679600548-4") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_PROJECTCODE_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1462679600548-5") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_ROLECODE_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1462679600548-6") {
        addUniqueConstraint(columnNames: "emp_id", constraintName: "UC_USEREMP_ID_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "user")
    }

    changeSet(author: "linchinghui (generated)", id: "1462679600548-7") {
        addUniqueConstraint(columnNames: "plate_no", constraintName: "UC_VEHICLEPLATE_NO_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "vehicle")
    }

    changeSet(author: "linchinghui (generated)", id: "1462679600548-8") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_VEHICLE_BRANDNAME_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "vehicle_brand")
    }

    changeSet(author: "linchinghui (generated)", id: "1462679600548-9") {
        addUniqueConstraint(columnNames: "emp_id", constraintName: "UC_WORKEREMP_ID_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "worker")
    }
}
