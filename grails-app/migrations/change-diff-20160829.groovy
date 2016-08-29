databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1472436203944-1") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_CERTIFICATE_CATEGORYCODE_COL", tableName: "certificate_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-2") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_CERTIFICATE_ORGANCODE_COL", tableName: "certificate_organ")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-3") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_FUNCTIONNAME_COL", tableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-4") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_MATERIALNAME_COL", tableName: "material")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-5") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_MATERIAL_CATEGORYCODE_COL", tableName: "material_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-6") {
        addUniqueConstraint(columnNames: "series", constraintName: "UC_PERSISTENT_LOGINSSERIES_COL", tableName: "persistent_logins")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-7") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_PROJECTCODE_COL", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-8") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_ROLECODE_COL", tableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-9") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_SUPPLIERCODE_COL", tableName: "supplier")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-10") {
        addUniqueConstraint(columnNames: "emp_id", constraintName: "UC_USEREMP_ID_COL", tableName: "user")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-11") {
        addUniqueConstraint(columnNames: "plate_no", constraintName: "UC_VEHICLEPLATE_NO_COL", tableName: "vehicle")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-12") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_VEHICLE_BRANDNAME_COL", tableName: "vehicle_brand")
    }

    changeSet(author: "linchinghui (generated)", id: "1472436203944-13") {
        addUniqueConstraint(columnNames: "emp_id", constraintName: "UC_WORKEREMP_ID_COL", tableName: "worker")
    }
}
