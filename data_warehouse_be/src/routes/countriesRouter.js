/* Configure serv & ... */
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

/**
 * Middlewares
 */

/* create application/json parser */
const jsonParser = bodyParser.json();

/* create application/x-www-form-urlencoded parser */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* Authentication */
const auth = require("../middlewares/authentication");

/* Controllers */
const countriesController = require("../controllers/countriesController");


/**
 * Country CRUD
 */

/* Create Country */

 router.post(
    "/country/new",
    jsonParser,
    auth,
    countriesController.createCountry
);


/* Get All Countries */

router.get(
    "/countries", 
    auth, 
    countriesController.getAllCountries
);

/* Get Country by ID */

router.get(
    "/countries/:id", 
    auth, 
    countriesController.findCountryIncludeRegion,
    countriesController.getCountryByID
);


/* Get Country by Region */

router.get(
    "/countries/region/:id", 
    auth, 
    countriesController.getCountriesByRegion
);


/* Update Region */

router.put(
    "/countries/:id",
    jsonParser,
    auth,
    countriesController.findCountry,
    countriesController.updateCountry
  );

/* Delete Region */

  router.delete(
    "/countries/:id",
    jsonParser,
    auth,
    countriesController.findCountry,
    countriesController.deleteCountry
  );

module.exports = router;
