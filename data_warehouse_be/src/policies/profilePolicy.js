const { User } = require("../database/models/usersModel");

module.exports = {
 
/**
 * @method isAdmin
 * @description Middleware that validates if the logged-in user is an administrator
 * @param {req, res, next}
 * @returns {}
 */

  isAdmin(req, res, next) {
    let userProfile = req.user.userProfile;
    let userStatus = req.user.userStatus;

    if (userProfile === "Admin" && userStatus === "Enabled") {
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized user" });
    }
  },

  /**
   * @method isBasic
   * @description Middleware that validates if the logged-in user isn't an administrator
   * @param {req, res, next}
   * @returns {}
  */

  isBasic(req, res, next) {
    let userProfile = req.user.userProfile;
    let userStatus = req.user.userStatus;

    if (userProfile === "Basic" && userStatus === "Enabled") {
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized user" });
    }
  },

  /**
   * @method checkUserBody
   * @description Middleware that validates if the user entered by Body is the logged-in user
   * @param {req, res, next}
   * @returns {}
  */

  checkUserBody(req, res, next) {
    let userID = req.user.userID;
    User.findOne({ where: { userID: req.body.userID } }).then((user) => {
      if (!user) {
        res.status(404).json({ msg: "User not found" });
      } else if (user.userID === userID) {
        next();
      } else {
        res.status(401).json({ msg: "Unauthorized User" });
      }
    });
  },

   /**
   * @method checkUserParams
   * @description Middleware that validates if the user entered by Params is the logged-in user
   * @param {req, res, next}
   * @returns {}
  */

  checkUserParams(req, res, next) {
    let userID = req.user.userID;
    User.findOne({ where: { userID: req.params.id } }).then((user) => {
      //console.log('console.log checkUserParams req.params: ', user, 'req.user: ', req.user.userID);
      if (!user) {
        res.status(404).json({ msg: "User not found" });
      } else if (user.userID === userID) {
        next();
      } else {
        res.status(401).json({ msg: "Unauthorized User" });
      }
    });
  },
  
};
