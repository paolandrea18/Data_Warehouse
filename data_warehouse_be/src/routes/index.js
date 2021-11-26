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


// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

module.exports = router;