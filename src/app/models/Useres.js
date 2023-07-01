const Sequelize = require("sequelize")
const { Model } = require("sequelize")

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            date: Sequelize.DATEONLY,
            card: Sequelize.STRING,
            value: Sequelize.DECIMAL,
            location: Sequelize.STRING
        },
            {
                sequelize,
            }
        )
    }
}

module.exports = User