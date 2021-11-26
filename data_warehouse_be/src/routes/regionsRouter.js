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
const regionsController = require("../controllers/regionsController");

/**
 * Regions CRUD
 */

router.post(
    "/regions/new",
    jsonParser,
    auth,
    regionsController.createRegion
);

/* Get Regions */

router.get(
    "/regions", 
    auth, 
    regionsController.getAllRegions);

/* Get Regions */

router.get(
  "/regions/country", 
  auth, 
  regionsController.getAllRegionsCountryCity);

/* Getting Region by ID  */

router.get(
  "/regions/:id",
  auth,
  regionsController.findRegion,
  regionsController.getRegionByID
);

/* Update Region */

router.put(
    "/regions/:id",
    jsonParser,
    auth,
    regionsController.findRegion,
    regionsController.updateRegion
  );

/* Delete Region */

router.delete(
    "/regions/:id",
    jsonParser,
    auth,
    regionsController.findRegion,
    regionsController.deleteRegion
  );

module.exports = router;