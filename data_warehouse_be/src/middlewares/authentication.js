/* Token */
const jwt = require("jsonwebtoken");

/* Configuration */
const authConfig = require("../../config/auth");

/* Configure Database */
const { User } = require("../database/models/usersModel");

module.exports = (req, res, next) => {
  //console.log('console.log Headers: ', req.headers);
  /* Check that the token exists */
  if (!req.headers.authorization) {
    res.status(401).json({ 
      status: 401,
      title: 'Unauthorized',
      ok: false,
      message: "Unauthorized user" });
  } else {
    /* Check that the token is valid */
    let token = req.headers.authorization.split(" ")[1]; // divides the strings into a ordered list of substrings and returns them into an array

    /* Check that the token is valid */
    jwt.verify(token, authConfig.secret, (error, decoded) => {
      //console.log('console.log Decoded: ', decoded);
      if (error) {
        res.status(500).json({ 
            status: 500,
            detail: error,
            ok: false,
            title: 'Internal Error Server',
            message: "There was a problem decoding the token" });
      } else {
        User.findOne({ where: { userID: decoded.user.userID } }).then(
          (user) => {
            //console.log("console.log  Usuario Autenticado: ", user);
            req.user = user;
            next();
          }
        );
      }
    });
  }
};
