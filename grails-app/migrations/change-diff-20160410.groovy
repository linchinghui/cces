databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1460221319862-1") {
        createTable(tableName: "announcement") {
            column(autoIncrement: "true", name: "id", type: "BIGINT") {
                constraints(primaryKey: "true", primaryKeyName: "PRIMARY")
            }

            column(name: "announced_date", type: "datetime")

            column(name: "created_date", type: "datetime") {
                constraints(nullable: "false")
            }

            column(name: "description", type: "VARCHAR(200)") {
                constraints(nullable: "false")
            }

            column(name: "revoked_date", type: "datetime")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1460221319862-2") {
        addColumn(tableName: "function") {
            column(name: "aided", type: "bit") {
                constraints(nullable: "true")
            }
        }
    }
}
