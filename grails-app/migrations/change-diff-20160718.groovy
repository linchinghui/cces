databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1468800456611-1") {
        createTable(tableName: "certificate") {
            column(autoIncrement: "true", name: "id", type: "BIGINT") {
                constraints(primaryKey: "true", primaryKeyName: "PRIMARY")
            }

            column(name: "category_id", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "copied", type: "datetime")

            column(name: "emp_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "exam_date", type: "datetime") {
                constraints(nullable: "false")
            }

            column(name: "expiry_date", type: "datetime")

            column(name: "title", type: "VARCHAR(40)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-2") {
        createTable(tableName: "certificate_category") {
            column(name: "code", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "description", type: "VARCHAR(100)") {
                constraints(nullable: "false")
            }

            column(name: "permanent", type: "BOOLEAN")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-3") {
        createTable(tableName: "certificate_organ") {
            column(name: "code", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "description", type: "VARCHAR(100)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-4") {
        addPrimaryKey(columnNames: "code", constraintName: "PRIMARY", tableName: "certificate_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-5") {
        addPrimaryKey(columnNames: "code", constraintName: "PRIMARY", tableName: "certificate_organ")
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-6") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_CERTIFICATE_CATEGORYCODE_COL", tableName: "certificate_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-7") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_CERTIFICATE_ORGANCODE_COL", tableName: "certificate_organ")
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-8") {
        addForeignKeyConstraint(baseColumnNames: "category_id", baseTableName: "certificate", constraintName: "FK_certificate_category", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "code", referencedTableName: "certificate_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-9") {
        addForeignKeyConstraint(baseColumnNames: "emp_id", baseTableName: "certificate", constraintName: "FK_certificate_worker", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "emp_id", referencedTableName: "worker")
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-10") {
        dropForeignKeyConstraint(baseTableName: "certification", constraintName: "FK_certification_emp")
    }

    changeSet(author: "linchinghui (generated)", id: "1468800456611-11") {
        dropTable(tableName: "certification")
    }

	// TODO: phase II
    // changeSet(author: "linchinghui (generated)", id: "1468800456611-12") {
    //     dropColumn(columnName: "contact_phone_no", tableName: "material")
    // }
	//
    // changeSet(author: "linchinghui (generated)", id: "1468800456611-13") {
    //     dropColumn(columnName: "registered_date", tableName: "material")
    // }
	//
    // changeSet(author: "linchinghui (generated)", id: "1468800456611-14") {
    //     dropColumn(columnName: "supplier", tableName: "material")
    // }
}
