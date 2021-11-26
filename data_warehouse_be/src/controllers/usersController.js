/* Configure Database */
const { User } = require("../database/models/usersModel");
const { Op } = require("sequelize");

/* Password hashing */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* Authentication */
const authConfig = require("../../config/auth");

module.exports = {
  
  /* login */
  
  signIn(req, res) {
    let { userAccount, password } = req.body;

    /* Find User */
    //console.log("Usuario Body UserAccount", userAccount);
    
    User.findAll({
      where: {
        [Op.or]: [{ userName: userAccount }, { userEmail: userAccount }],
      },
    })
      .then((users) => {
        if (!users) {
          res.status(404).json({ message: "User not found" });
        } else {
          if (bcrypt.compareSync(password, users[0].userPassword)) {
            /* Create Token */
            let token = jwt.sign({ user: users[0] }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });
            res.status(200).json({
              user: users[0].userProfile,
              token: token,
              status: 201,
              ok: true,
              title: 'Successful request',
              message: ""
            });
          } else {
            // Unathorized Access
            res.status(401).json({ 
              status: 401,
              title: 'Unauthorized',
              ok: false,
              message: "Invalid username or password" });
          }
        }
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          detail: error.message,
          ok: false,
          title: 'Internal Error Server',
          message: 'Internal Error Server'
        })
      });
  },

  /* Register - Create new user */

  signUp(req, res) {
    let passwordLen = req.body.userPassword;

    if (
      passwordLen === null ||
      passwordLen === "null" ||
      passwordLen.length < 8 ||
      passwordLen.length > 200
    ) {
      res.status(400).json({
        status: 400,
        ok: false,
        title: 'Bad Request',
        message: "Password must be between 8 and 20 characters in length.",
      });
    } else {
      /* Encrypt password */
      let hashPassword = bcrypt.hashSync(
        req.body.userPassword,
        Number.parseInt(authConfig.rounds)
      );

      /* Create a user */
      console.log("UserEmail:", req.body.userEmail);     
      User.create({
        userName: req.body.userName,
        userLastName: req.body.userLastName,
        userEmail: req.body.userEmail,
        userProfile: req.body.userProfile,
        userPassword: hashPassword,
        userImg: req.body.userImg,
      })
        .then((user) => {  
          res.status(201).json({ 
            user,
            status: 201,
            ok: true,
            title: 'Successful request',
            message: "Created" });
        })
        .catch((err) => {
          res.status(400).json({ 
            status: 400,
            detail:err.message,
            ok: false,
            title: 'Bad Request',
            message: 'Internal Error Server'
           });
        });
    }
  },

  /* Middelware Find User by ID */

  findUser(req, res, next) {
    User.findOne({ where: { userID: req.params.id } }).then((user) => {
      if (!user) {
        res.status(404).json({ 
          status: 404,
          ok: false,
          title: 'Not Found',
          message: "User not found" });
      } else {
        req.user = user;
        next();
      }
    });
  },

  /* Get Enabled Users */

  getEnabledUsers(req, res) {
    User.findAll({ where: { userStatus: "Enabled" } }).then((users) => {
      res.status(200).json({
        users,
        status: 200,
        ok: true,
        title: 'Successful request',
        message: 'User Found',
      });
    });
  },

  /* Get all Users */

  getAllUsers(req, res) {
    User.findAll().then((users) => {
      res.status(200).json({
        users,
        status: 200,
        ok: true,
        title: 'Successful request',
        message: 'User Found',
      });
    });
  },

  /* Get User by ID */

  getOneUser(req, res) {
    res.status(200).json({
      user: req.user,
      status: 200,
      ok: true,
      title: 'Successful request',
      message: 'User Found',
    });
  },

  /* Update User one */

  updateUser(req, res) {
    let passwordUpdated = req.body.passwordUpdated;
    let hashNewPassword;
    if (passwordUpdated = "Updated") {
      /* Encrypt password */
      hashNewPassword = bcrypt.hashSync(
      req.body.userPassword,
      Number.parseInt(authConfig.rounds)
      
    );
    } else { 
      hashNewPassword = req.user.userPassword; 
    }
    
    req.user.userName = req.body.userName;
    req.user.userLastName = req.body.userLastName;
    req.user.userEmail = req.body.userEmail;
    req.user.userProfile = req.body.userProfile;
    req.user.userPassword = hashNewPassword;
    req.user.userImg = req.body.userImg;
    req.user.userStatus = req.body.userStatus;

    req.user.save().then((user) => {
      res.status(200).json({ 
        user,
        status: 200,
        ok: true,
        title: 'Successful request',
        message: "Updated user" });
    });
  },

   /* Update Password User one */

   updateUserPassword(req, res) {
    /* Encrypt password */
    let hashNewPassword = bcrypt.hashSync(
      req.body.userPassword,
      Number.parseInt(authConfig.rounds)
    );
    req.user.userPassword = hashNewPassword;

    req.user.save().then((user) => {
      res.status(200).json({ 
        user,
        status: 200,
        ok: true,
        title: 'Successful request',
        message: "Updated password" });
    });
  },

  /* Delete User */

  deleteUser(req, res) {
    req.user.userStatus = "Disabled";

    req.user.save().then((user) => {
      res.status(200).json({ 
        user,
        status: 200,
        ok: true,
        title: 'Successful request',
        message: "Disabled user" });
    });
  }

};
