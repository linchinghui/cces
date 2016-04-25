databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1461558601719-1") {
        createTable(tableName: "sp_task") {
            column(name: "project_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "worked_date", type: "datetime") {
                constraints(nullable: "false")
            }

            column(name: "employee_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "construct_code", type: "VARCHAR(4)")

            column(name: "construct_place", type: "VARCHAR(40)")

            column(name: "construct_type", type: "VARCHAR(255)") {
                constraints(nullable: "false")
            }

            column(name: "equipment", type: "VARCHAR(255)")

            column(name: "note", type: "VARCHAR(255)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1461558601719-2") {
        createTable(tableName: "vehicle_milage") {
            column(name: "project_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "dispatched_date", type: "datetime") {
                constraints(nullable: "false")
            }

            column(name: "vehicle_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "km", type: "INT") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1461558601719-3") {
        addPrimaryKey(columnNames: "project_id, worked_date, employee_id", constraintName: "PRIMARY", tableName: "sp_task")
    }

    changeSet(author: "linchinghui (generated)", id: "1461558601719-4") {
        addPrimaryKey(columnNames: "project_id, dispatched_date, vehicle_id", constraintName: "PRIMARY", tableName: "vehicle_milage")
    }

    changeSet(author: "linchinghui (generated)", id: "1461558601719-5") {
        addForeignKeyConstraint(baseColumnNames: "project_id", baseTableName: "sp_task", constraintName: "FK_sptask_project", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "code", referencedTableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1461558601719-6") {
        addForeignKeyConstraint(baseColumnNames: "project_id", baseTableName: "vehicle_milage", constraintName: "FK_milage_project", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "code", referencedTableName: "project")
    }

    changeSet(author: "linchinghui (generated)", id: "1461558601719-7") {
        addForeignKeyConstraint(baseColumnNames: "vehicle_id", baseTableName: "vehicle_milage", constraintName: "FK_milage_vehicle", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "plate_no", referencedTableName: "vehicle")
    }

    changeSet(author: "linchinghui (generated)", id: "1461558601719-8") {
        addForeignKeyConstraint(baseColumnNames: "employee_id", baseTableName: "sp_task", constraintName: "FK_sptask_worker", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "emp_id", referencedTableName: "worker")
    }
}
