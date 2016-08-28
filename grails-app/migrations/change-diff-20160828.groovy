databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1472398344731-1") {
        addUniqueConstraint(columnNames: "construct_no", constraintName: "UC_PROJECTCONSTRUCT_NO_COL", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-2") {
        addForeignKeyConstraint(baseColumnNames: "function_id", baseTableName: "announcement", constraintName: "FK_announcement_function", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "name", referencedTableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-3") {
        dropUniqueConstraint(constraintName: "UC_CERTIFICATE_CATEGORYCODE_COL", tableName: "certificate_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-4") {
        dropUniqueConstraint(constraintName: "UC_CERTIFICATE_ORGANCODE_COL", tableName: "certificate_organ")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-5") {
        dropUniqueConstraint(constraintName: "UC_FUNCTIONNAME_COL", tableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-6") {
        dropUniqueConstraint(constraintName: "UC_MATERIAL_CATEGORYCODE_COL", tableName: "material_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-7") {
        dropUniqueConstraint(constraintName: "UC_PERSISTENT_LOGINSSERIES_COL", tableName: "persistent_logins")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-8") {
        dropUniqueConstraint(constraintName: "UC_PROJECTCODE_COL", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-9") {
        dropUniqueConstraint(constraintName: "UC_ROLECODE_COL", tableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-10") {
        dropUniqueConstraint(constraintName: "UC_SUPPLIERCODE_COL", tableName: "supplier")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-11") {
        dropUniqueConstraint(constraintName: "UC_USEREMP_ID_COL", tableName: "user")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-12") {
        dropUniqueConstraint(constraintName: "UC_VEHICLEPLATE_NO_COL", tableName: "vehicle")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-13") {
        dropUniqueConstraint(constraintName: "UC_VEHICLE_BRANDNAME_COL", tableName: "vehicle_brand")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-14") {
        dropUniqueConstraint(constraintName: "UC_WORKEREMP_ID_COL", tableName: "worker")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-15") {
        addNotNullConstraint(columnDataType: "varchar(20)", columnName: "construct_no", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1472398344731-16") {
        dropNotNullConstraint(columnDataType: "datetime", columnName: "registered_date", tableName: "material")
    }
}
