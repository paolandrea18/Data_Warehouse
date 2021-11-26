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
const chanelsController = require("../controllers/chanelsContoller");


/**
 * Chanel CRUD
 */


/* Create Chanel */

router.post(
    "/chanel/new",
    jsonParser,
    auth,
    chanelsController.createChanel
);

/* Get All Chanels */

router.get(
    "/chanels",
    auth,
    chanelsController.getAllChanels
);

/* Get Chanel by ID */

router.get(
    "/Chanels/:id", 
    auth,
    chanelsController.findChanelByID,
    chanelsController.getChanelByID

);

/* Get Chanels by Contact ID */

router.get(
    "/chanels/contact/:id", 
    auth, 
    chanelsController.getChanelByContactID
);


/* Update Chanel */

router.put(
    "/chanels/:id",
    jsonParser,
    auth,
    chanelsController.findChanelByID,
    chanelsController.updateChanel
);

/* Delete Chanel */

router.delete(
    "/Chanels/:id",
    auth,
    chanelsController.findChanelByID,
    chanelsController.deleteChanel
);

module.exports = router;

