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
const citiesController = require("../controllers/citiesController");


/**
 * City CRUD
 */

/* Create City */

router.post(
    "/city/new",
    jsonParser,
    auth,
    citiesController.createCity
);

/* Get All Cities */

router.get(
    "/cities", 
    auth, 
    citiesController.getAllCities
);

/* Get City by ID */

router.get(
    "/cities/:id", 
    auth, 
    citiesController.findCityIncludeCountry,
    citiesController.getCityByID
);

/* Get City by Country */

router.get(
    "/cities/country/:id", 
    auth, 
    citiesController.getCitiesByCountry
);

/* Update City */

router.put(
    "/cities/:id",
    jsonParser,
    auth,
    citiesController.findCity,
    citiesController.updateCity
  );

/* Delete City */

router.delete(
    "/cities/:id",
    jsonParser,
    auth,
    citiesController.findCity,
    citiesController.deleteCity
  );


  module.exports = router;