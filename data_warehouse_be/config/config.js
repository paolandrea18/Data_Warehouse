require("dotenv").config();

module.exports = {
  /* DB Configuration */
  database: {
    username: process.env.DB_USERNAME || "Acamica",
    password: process.env.DB_PASSWORD || "Acamica123",
    database: process.env.DB_DATABASE || "datawarehouse",
    host: process.env.DB_HOST || "localhost//mysql",
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.DB_PORT || 3307,
  },
};
