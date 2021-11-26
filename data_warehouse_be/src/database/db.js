const { Sequelize } = require("sequelize");
const { database } = require("../../config/config");

/**
 * Database config
 */

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    host: "localhost",
    dialect: "mysql",
    port: database.port,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error(`Error de conexion: ${err}`));

module.exports = sequelize;
