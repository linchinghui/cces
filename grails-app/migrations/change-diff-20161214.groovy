databaseChangeLog = {

    changeSet(author: "linchinghui (generated)", id: "1481730071455-1") {
        addColumn(tableName: "worker") {
            column(name: "avatar_photo", type: "varchar(255)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1481730071455-2") {
        addColumn(tableName: "worker") {
            column(name: "diploma_photo", type: "varchar(255)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1481730071455-3") {
        addColumn(tableName: "worker") {
            column(name: "gdl_photo", type: "varchar(255)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1481730071455-4") {
        addColumn(tableName: "worker") {
            column(name: "id_card_photo", type: "varchar(255)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1481730071455-5") {
        addColumn(tableName: "worker") {
            column(name: "nhi_ic_card_photo", type: "varchar(255)")
        }
    }

    changeSet(author: "linchinghui (generated)", id: "1481730071455-6") {
        addColumn(tableName: "worker") {
            column(name: "oor_photo", type: "varchar(255)")
        }
    }
}
