const Sequelize = require("sequelize")

const configDatabase = require("../config/database")

const User = require("../app/models/Useres")

const models = [User]
class DataBase {
    constructor() {
        this.init()
    }
    init() {
        this.conection = new Sequelize(configDatabase)
        models.map((model) => model.init(this.conection))
    }
}

module.exports = new DataBase()