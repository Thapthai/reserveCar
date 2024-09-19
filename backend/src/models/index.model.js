const dbConfig = require("../configs/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    define: {
        freezeTableName: true,
    },
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },

});

Sequelize.DATE.prototype._stringify = function _stringify(
    date,
    options
) {
    date = this._applyTimezone(date, options);

    return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model")(sequelize, Sequelize);
db.depaertments = require("./departments.model")(sequelize, Sequelize);

module.exports = db;