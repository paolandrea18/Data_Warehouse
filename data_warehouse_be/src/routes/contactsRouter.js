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
const contactsController = require("../controllers/contactsController");


/**
 * Contact CRUD
 */


/* Create Contact */

router.post(
    "/contact/new",
    jsonParser,
    auth,
    contactsController.createContact
);

/* Get All Contacts */

router.get(
    "/contacts",
    auth,
    contactsController.getAllContacts
);

/* Get Contact by ID */

router.get(
    "/contacts/:id", 
    auth,
    contactsController.findContactIncludeCompany,
    contactsController.getContactByID

);

/* Update Contact */

router.put(
    "/contacts/:id",
    jsonParser,
    auth,
    contactsController.findContact,
    contactsController.updateContact
);

/* Delete Contact */

router.delete(
    "/contacts/:id",
    auth,
    contactsController.findContact,
    contactsController.deleteContact
);

/* Filter Contact */

router.post(
    "/contacts/filter",
    jsonParser,
    auth,
    contactsController.filterContact
);

module.exports = router;

