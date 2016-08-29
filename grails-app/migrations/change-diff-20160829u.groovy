databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1472437382061-1") {
        dropUniqueConstraint(constraintName: "UC_CERTIFICATE_CATEGORYCODE_COL", tableName: "certificate_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-2") {
        dropUniqueConstraint(constraintName: "UC_CERTIFICATE_ORGANCODE_COL", tableName: "certificate_organ")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-3") {
        dropUniqueConstraint(constraintName: "UC_FUNCTIONNAME_COL", tableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-4") {
        dropUniqueConstraint(constraintName: "UC_MATERIALNAME_COL", tableName: "material")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-5") {
        dropUniqueConstraint(constraintName: "UC_MATERIAL_CATEGORYCODE_COL", tableName: "material_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-6") {
        dropUniqueConstraint(constraintName: "UC_PERSISTENT_LOGINSSERIES_COL", tableName: "persistent_logins")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-7") {
        dropUniqueConstraint(constraintName: "UC_PROJECTCODE_COL", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-8") {
        dropUniqueConstraint(constraintName: "UC_ROLECODE_COL", tableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-9") {
        dropUniqueConstraint(constraintName: "UC_SUPPLIERCODE_COL", tableName: "supplier")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-10") {
        dropUniqueConstraint(constraintName: "UC_USEREMP_ID_COL", tableName: "user")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-11") {
        dropUniqueConstraint(constraintName: "UC_VEHICLEPLATE_NO_COL", tableName: "vehicle")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-12") {
        dropUniqueConstraint(constraintName: "UC_VEHICLE_BRANDNAME_COL", tableName: "vehicle_brand")
    }

    changeSet(author: "linchinghui (generated)", id: "1472437382061-13") {
        dropUniqueConstraint(constraintName: "UC_WORKEREMP_ID_COL", tableName: "worker")
    }
}
