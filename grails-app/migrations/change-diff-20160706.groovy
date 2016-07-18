databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1467804934506-1") {
        createTable(tableName: "material_supplier") {
            column(name: "material_id", type: "BIGINT") {
                constraints(nullable: "false")
            }

            column(name: "supplier_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "brand", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "fax_no", type: "VARCHAR(12)")

            column(name: "phone_no", type: "VARCHAR(12)")

            column(name: "purchased_date", type: "datetime")

            column(name: "purchased_price", type: "DECIMAL(19, 2)")

            column(name: "saleman", type: "VARCHAR(10)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-2") {
        createTable(tableName: "revenue") {
            column(autoIncrement: "true", name: "id", type: "BIGINT") {
                constraints(primaryKey: "true", primaryKeyName: "PRIMARY")
            }

            column(name: "invoice_date", type: "datetime") {
                constraints(nullable: "false")
            }

            column(name: "invoie_no", type: "VARCHAR(255)") {
                constraints(nullable: "false")
            }

            column(name: "modified_date", type: "datetime")

            column(name: "note", type: "VARCHAR(255)")

            column(name: "project_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "record_date", type: "datetime")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-3") {
        createTable(tableName: "supplier") {
            column(name: "code", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "contact", type: "VARCHAR(10)")

            column(name: "contact_phone_no", type: "VARCHAR(12)")

            column(name: "email", type: "VARCHAR(40)")

            column(name: "fax_no", type: "VARCHAR(12)")

            column(name: "name", type: "VARCHAR(40)") {
                constraints(nullable: "false")
            }

            column(name: "phone_no", type: "VARCHAR(12)")

            column(name: "ubn", type: "VARCHAR(8)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-4") {
        addColumn(tableName: "project") {
			columns {
				column(name: "acceptance_date", type: "datetime")
				column(name: "closed", type: "bit")
				column(name: "project_kind", type: "varchar(3)") {
	                constraints(nullable: "false")
	            }
				column(name: "project_type", type: "varchar(255)") {
	                constraints(nullable: "false")
	            }
			}
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-6") {
        addColumn(tableName: "material") {
			columns {
				column(name: "dimension", type: "varchar(100)")
				column(name: "texture", type: "varchar(100)")
			}
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-10") {
        addPrimaryKey(columnNames: "material_id, supplier_id, brand", constraintName: "PRIMARY", tableName: "material_supplier")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-11") {
        addPrimaryKey(columnNames: "code", constraintName: "PRIMARY", tableName: "supplier")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-12") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_FUNCTIONNAME_COL", tableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-13") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_MATERIAL_CATEGORYCODE_COL", tableName: "material_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-14") {
        addUniqueConstraint(columnNames: "series", constraintName: "UC_PERSISTENT_LOGINSSERIES_COL", tableName: "persistent_logins")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-15") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_PROJECTCODE_COL", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-16") {
        addUniqueConstraint(columnNames: "invoie_no", constraintName: "UC_REVENUEINVOIE_NO_COL", tableName: "revenue")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-17") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_ROLECODE_COL", tableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-18") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_SUPPLIERCODE_COL", tableName: "supplier")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-19") {
        addUniqueConstraint(columnNames: "emp_id", constraintName: "UC_USEREMP_ID_COL", tableName: "user")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-20") {
        addUniqueConstraint(columnNames: "plate_no", constraintName: "UC_VEHICLEPLATE_NO_COL", tableName: "vehicle")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-21") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_VEHICLE_BRANDNAME_COL", tableName: "vehicle_brand")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-22") {
        addUniqueConstraint(columnNames: "emp_id", constraintName: "UC_WORKEREMP_ID_COL", tableName: "worker")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-23") {
        addForeignKeyConstraint(baseColumnNames: "project_id", baseTableName: "revenue", constraintName: "FK_revenue_project", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "code", referencedTableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-24") {
        addForeignKeyConstraint(baseColumnNames: "supplier_id", baseTableName: "material_supplier", constraintName: "FK_material_supplier", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "code", referencedTableName: "supplier")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-25") {
        addForeignKeyConstraint(baseColumnNames: "material_id", baseTableName: "material_supplier", constraintName: "FK_supplier_material", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "id", referencedTableName: "material")
    }

    changeSet(author: "linchinghui (generated)", id: "1467804934506-26") {
        dropUniqueConstraint(constraintName: "UC_MATERIALNAME_COL", tableName: "material")
    }

}
