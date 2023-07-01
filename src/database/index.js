const Sequelize = require("sequelize")

const configDatabase = require("../config/database")

const User = require("../app/models/Useres")

const models = [User]
class DataBase {
    constructor() {
        this.init()
    }
    init() {
        this.conection = new Sequelize('postgresql://postgres:7MsN26q8bXCptF8SGnRx@containers-us-west-203.railway.app:7310/railway')
        models.map((model) => model.init(this.conection))
    }
}

module.exports = new DataBase()