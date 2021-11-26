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
const companiesController = require("../controllers/companiesController");


/**
 * Company CRUD
 */


/* Create Company */

router.post(
    "/company/new",
    jsonParser,
    auth,
    companiesController.createCompany
);

/* Get All Companies */

router.get(
    "/companies", 
    auth, 
    companiesController.getAllCompanies
);

/* Get Company by ID */

router.get(
    "/companies/:id", 
    auth, 
    companiesController.findCompanyIncludeCity,
    companiesController.getCompanyByID
);

/* Update Company */

router.put(
    "/companies/:id",
    jsonParser,
    auth,
    companiesController.findCompanyIncludeCity,
    companiesController.updateCompany
  );


/* Delete Company */

router.delete(
    "/companies/:id",
    jsonParser,
    auth,
    companiesController.findCompany,
    companiesController.deleteCompany
  );


  module.exports = router;
