databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1490540597954-1") {
        createTable(tableName: "assignment2") {
            column(name: "project_id", type: "VARCHAR(20)") {
                constraints(nullable: "false")
            }

            column(name: "employee_id", type: "VARCHAR(10)") {
                constraints(nullable: "false")
            }

            column(name: "year", type: "INT") {
                constraints(nullable: "false")
            }

            column(name: "month", type: "INT") {
                constraints(nullable: "false")
            }

            column(name: "d1", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d2", type: "BOOLEAN") {
                constraints(nullable: "false")
            }
			column(name: "d3", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d4", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d5", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d6", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d7", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d8", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d9", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d10", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d11", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d12", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d13", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d14", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d15", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d16", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d17", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d18", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d19", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d20", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d21", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d22", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d23", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d24", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d25", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d26", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d27", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d28", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d29", type: "BOOLEAN") {
                constraints(nullable: "false")
            }


            column(name: "d30", type: "BOOLEAN") {
                constraints(nullable: "false")
            }

            column(name: "d31", type: "BOOLEAN") {
                constraints(nullable: "false")
            }
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1490540597954-2") {
        addColumn(tableName: "project") {
            column(name: "construct_model", type: "varchar(20)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1490540597954-3") {
        addColumn(tableName: "certificate") {
            column(name: "photo", type: "varchar(255)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1490540597954-4") {
        addPrimaryKey(columnNames: "project_id, employee_id, year, month", constraintName: "PRIMARY", tableName: "assignment2")
    }

    changeSet(author: "linchinghui (generated)", id: "1490540597954-5") {
        addForeignKeyConstraint(baseColumnNames: "employee_id", baseTableName: "assignment2", constraintName: "FK_assignment2_employee", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "emp_id", referencedTableName: "worker")
    }

    changeSet(author: "linchinghui (generated)", id: "1490540597954-6") {
        addForeignKeyConstraint(baseColumnNames: "project_id", baseTableName: "assignment2", constraintName: "FK_assignment2_project", deferrable: "false", initiallyDeferred: "false", referencedColumnNames: "code", referencedTableName: "project")
    }



    changeSet(author: "linchinghui (generated)", id: "1490540597954-10") {
        dropColumn(columnName: "construct_type", tableName: "sp_task")
    }
}
