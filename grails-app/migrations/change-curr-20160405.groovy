databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1459865835631-1") {
        createTable(tableName: "assignment") {
            column(name: "employee_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "project_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "year", type: "INT") {
                constraints(nullable: "false")
            }

            column(name: "week", type: "INT") {
                constraints(nullable: "false")
            }

            column(name: "d1", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "d2", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "d3", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "d4", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "d5", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "d6", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "d0", type: "BIT(1)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-2") {
        createTable(tableName: "certification") {
            column(name: "emp_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "title", type: "VARCHAR(40)") {
                constraints(nullable: "false")
            }

            column(name: "uri", type: "TINYBLOB")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-3") {
        createTable(tableName: "function") {
            column(name: "name", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "description", type: "VARCHAR(100)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-4") {
        createTable(tableName: "material") {
            column(autoIncrement: "true", name: "id", type: "BIGINT") {
                constraints(primaryKey: "true")
            }

            column(name: "category_id", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "contact_phone_no", type: "VARCHAR(12)")

            column(name: "name", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "price", type: "DECIMAL(19, 2)")

            column(name: "quantity", type: "INT") {
                constraints(nullable: "false")
            }

            column(name: "registered_date", type: "datetime") {
                constraints(nullable: "false")
            }

            column(name: "spec", type: "VARCHAR(100)")

            column(name: "supplier", type: "VARCHAR(40)")

            column(name: "unit", type: "VARCHAR(10)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-5") {
        createTable(tableName: "material_category") {
            column(name: "code", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "description", type: "VARCHAR(100)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-6") {
        createTable(tableName: "persistent_logins") {
            column(name: "series", type: "VARCHAR(64)") {
                constraints(nullable: "false")
            }

            column(name: "last_used", type: "datetime") {
                constraints(nullable: "false")
            }

            column(name: "token", type: "VARCHAR(64)") {
                constraints(nullable: "false")
            }

            column(name: "username", type: "VARCHAR(64)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-7") {
        createTable(tableName: "privilege") {
            column(name: "role_id", type: "VARCHAR(12)") {
                constraints(nullable: "false")
            }

            column(name: "function_id", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "can_delete", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "can_read", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "can_write", type: "BIT(1)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-8") {
        createTable(tableName: "project") {
            column(name: "code", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "construct_code", type: "VARCHAR(4)") {
                constraints(nullable: "false")
            }

            column(name: "construct_no", type: "VARCHAR(20)")

            column(name: "construct_place", type: "VARCHAR(40)") {
                constraints(nullable: "false")
            }

            column(name: "contact", type: "VARCHAR(36)")

            column(name: "contact_person", type: "VARCHAR(40)")

            column(name: "contact_phone_no", type: "VARCHAR(12)")

            column(name: "customer", type: "VARCHAR(40)")

            column(name: "description", type: "VARCHAR(40)") {
                constraints(nullable: "false")
            }

            column(name: "duration_begin", type: "datetime")

            column(name: "duration_end", type: "datetime")

            column(name: "note", type: "VARCHAR(255)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-9") {
        createTable(tableName: "role") {
            column(name: "code", type: "VARCHAR(12)") {
                constraints(nullable: "false")
            }

            column(name: "description", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-10") {
        createTable(tableName: "user") {
            column(name: "emp_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "account_expired", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "account_locked", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "credentials_expired", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "enabled", type: "BIT(1)") {
                constraints(nullable: "false")
            }

            column(name: "name", type: "VARCHAR(10)")

            column(name: "password", type: "VARCHAR(250)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-11") {
        createTable(tableName: "user_role") {
            column(name: "user_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "role_id", type: "VARCHAR(12)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-12") {
        createTable(tableName: "vehicle") {
            column(name: "plate_no", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "brand_id", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "inspected_date", type: "datetime")

            column(name: "model", type: "VARCHAR(40)")

            column(name: "note", type: "VARCHAR(100)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-13") {
        createTable(tableName: "vehicle_brand") {
            column(name: "name", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "description", type: "VARCHAR(40)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-14") {
        createTable(tableName: "worker") {
            column(name: "emp_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "avatar_copied", type: "datetime")

            column(name: "diploma_copied", type: "datetime")

            column(name: "emp_name", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "employed_date", type: "datetime") {
                constraints(nullable: "false")
            }

            column(name: "gdl_copied", type: "datetime")

            column(name: "id_card_copied", type: "datetime")

            column(name: "nhi_ic_card_copied", type: "datetime")

            column(name: "oor_copied", type: "datetime")

            column(name: "resigned_date", type: "datetime")

            column(name: "sex", type: "VARCHAR(255)") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-15") {
        addPrimaryKey(columnNames: "employee_id, project_id, year, week", constraintName: "PRIMARY", tableName: "assignment")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-16") {
        addPrimaryKey(columnNames: "emp_id, title", constraintName: "PRIMARY", tableName: "certification")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-17") {
        addPrimaryKey(columnNames: "name", constraintName: "PRIMARY", tableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-18") {
        addPrimaryKey(columnNames: "code", constraintName: "PRIMARY", tableName: "material_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-19") {
        addPrimaryKey(columnNames: "series", constraintName: "PRIMARY", tableName: "persistent_logins")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-20") {
        addPrimaryKey(columnNames: "role_id, function_id", constraintName: "PRIMARY", tableName: "privilege")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-21") {
        addPrimaryKey(columnNames: "code", constraintName: "PRIMARY", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-22") {
        addPrimaryKey(columnNames: "code", constraintName: "PRIMARY", tableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-23") {
        addPrimaryKey(columnNames: "emp_id", constraintName: "PRIMARY", tableName: "user")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-24") {
        addPrimaryKey(columnNames: "user_id, role_id", constraintName: "PRIMARY", tableName: "user_role")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-25") {
        addPrimaryKey(columnNames: "plate_no", constraintName: "PRIMARY", tableName: "vehicle")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-26") {
        addPrimaryKey(columnNames: "name", constraintName: "PRIMARY", tableName: "vehicle_brand")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-27") {
        addPrimaryKey(columnNames: "emp_id", constraintName: "PRIMARY", tableName: "worker")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-28") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_FUNCTIONNAME_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-29") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_MATERIALNAME_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "material")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-30") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_MATERIAL_CATEGORYCODE_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "material_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-31") {
        addUniqueConstraint(columnNames: "series", constraintName: "UC_PERSISTENT_LOGINSSERIES_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "persistent_logins")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-32") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_PROJECTCODE_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-33") {
        addUniqueConstraint(columnNames: "code", constraintName: "UC_ROLECODE_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-34") {
        addUniqueConstraint(columnNames: "emp_id", constraintName: "UC_USEREMP_ID_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "user")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-35") {
        addUniqueConstraint(columnNames: "plate_no", constraintName: "UC_VEHICLEPLATE_NO_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "vehicle")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-36") {
        addUniqueConstraint(columnNames: "name", constraintName: "UC_VEHICLE_BRANDNAME_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "vehicle_brand")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-37") {
        addUniqueConstraint(columnNames: "emp_id", constraintName: "UC_WORKEREMP_ID_COL", deferrable: "false", disabled: "false", initiallyDeferred: "false", tableName: "worker")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-38") {
        addForeignKeyConstraint(baseColumnNames: "employee_id", baseTableName: "assignment", constraintName: "FK_assignment_employee", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "emp_id", referencedTableName: "worker")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-39") {
        addForeignKeyConstraint(baseColumnNames: "project_id", baseTableName: "assignment", constraintName: "FK_assignment_project", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "code", referencedTableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-40") {
        addForeignKeyConstraint(baseColumnNames: "emp_id", baseTableName: "certification", constraintName: "FK_certification_emp", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "emp_id", referencedTableName: "worker")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-41") {
        addForeignKeyConstraint(baseColumnNames: "category_id", baseTableName: "material", constraintName: "FK_material_category", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "code", referencedTableName: "material_category")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-42") {
        addForeignKeyConstraint(baseColumnNames: "function_id", baseTableName: "privilege", constraintName: "FK_privilege_function", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "name", referencedTableName: "function")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-43") {
        addForeignKeyConstraint(baseColumnNames: "role_id", baseTableName: "privilege", constraintName: "FK_privilege_role", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "code", referencedTableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-44") {
        addForeignKeyConstraint(baseColumnNames: "role_id", baseTableName: "user_role", constraintName: "FK_userrole_role", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "code", referencedTableName: "role")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-45") {
        addForeignKeyConstraint(baseColumnNames: "user_id", baseTableName: "user_role", constraintName: "FK_userrole_user", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "emp_id", referencedTableName: "user")
    }

    changeSet(author: "linchinghui (generated)", id: "1459865835631-46") {
        addForeignKeyConstraint(baseColumnNames: "brand_id", baseTableName: "vehicle", constraintName: "FK_vehicle_brand", deferrable: "false", initiallyDeferred: "false", onDelete: "NO ACTION", onUpdate: "NO ACTION", referencedColumnNames: "name", referencedTableName: "vehicle_brand")
    }
}
