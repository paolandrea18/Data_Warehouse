require("dotenv").config();

/**
 * Config
 */

/* Server config */
const express = require("express");
const server = express();

/* Port config */
const PORT = process.env.PORT;

/* Data Base and Schemas */
const sequelize = require("./src/database/db");

/**
 * Middlewares
 */

/* Cors */
const cors = require("cors");

/* Helmet */
const helmet = require("helmet");

/* errorHandler */
const { errorHandler } = require("./src/middlewares/errorHandler");

/**
 * Routes
 */

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/usersRouter");
const regionsRouter = require("./src/routes/regionsRouter");
const countriesRouter = require("./src/routes/countriesRouter");
const citiesRouter = require("./src/routes/citiesRouter");
const companiesRouter = require("./src/routes/companiesRouter");
const contactsRouter = require("./src/routes/contactsRouter");
const chanelsRouter = require("./src/routes/chanelsRouter");

/* Middlewares */
server.use(helmet());
server.use(cors()); //Enable CORS Origin

/* Lets server accept JSON as a body */
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//server.use(errorHandler);

/* Routes */
server.use("/", indexRouter);
server.use("/", usersRouter);
server.use("/", regionsRouter);
server.use("/", countriesRouter);
server.use("/", citiesRouter);
server.use("/", companiesRouter);
server.use("/", contactsRouter);
server.use("/", chanelsRouter);

/**
 * Start Server
 */
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Force True: Drop Tables
 */

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables have been created");
  })
  .catch((error) => {
    console.log("Something was wrong: ", error);
  });
