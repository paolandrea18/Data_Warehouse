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
const usersController = require("../controllers/usersController");

/* Policies */
const profilePolicy = require("../policies/profilePolicy");


/**
 * User Login
 */

router.post("/login", jsonParser, usersController.signIn);

/**
 * Register - Create new user
 */

router.post("/register", jsonParser, auth, profilePolicy.isAdmin,  usersController.signUp);

/**
 * Users CRUD
 */



/* Get Enabled Users - Only admin users consults all users */

router.get("/users", auth, profilePolicy.isAdmin, usersController.getEnabledUsers);

/* Get All Users - Only admin users consults all users */

router.get("/allusers", auth, profilePolicy.isAdmin, usersController.getEnabledUsers);

/* Getting User by ID - Only admin users consults users by ID */

router.get(
  "/users/:id",
  auth,
  profilePolicy.isAdmin,
  usersController.findUser,
  usersController.getOneUser
);

/* Get User by ID - Each user can see their user information */

router.get(
  "/user/:id",
  auth,
  usersController.findUser,
  usersController.getOneUser
);

/* Update User - Only admin users */

router.put(
    "/user/:id",
    jsonParser,
    auth,
    profilePolicy.isAdmin,
    usersController.findUser,
    usersController.updateUser
  );


/* Delete User - Only admin users */

router.delete(
    "/user/:id",
    jsonParser,
    auth,
    profilePolicy.isAdmin,
    usersController.findUser,
    usersController.deleteUser
  );

module.exports = router;