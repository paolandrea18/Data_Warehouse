const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * Users Model
 */

class User extends Model {}
User.init(
  {
    // attributes
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        is: {
          args: [/^[a-zA-Z\s-, ]+$/i],
          msg: "User Name only allow alphabetic characters",
        },
        len: {
          args: [2, 100],
          msg: "User Name must be between 2 and 100 characters in length.",
        },
        notNull: {
          msg: "Please enter the User Name",
        },
      },
    },
    userLastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        is: {
          args: [/^[a-zA-Z\s-, ]+$/i],
          msg: "User Name only allow alphabetic characters",
        },
        len: {
          args: [2, 100],
          msg: "User Name must be between 2 and 100 characters in length.",
        },
        notNull: {
          msg: "Please enter the User Lastname",
        },
      },
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: {
        msg: "This Email address is already taken.",
      },
      validate: {
        isEmail: {
          msg: "Email address must be valid.",
        }, // checks for email format (foo@bar.com)
        len: {
          args: [7, 100],
          msg: "Email address must be between 7 and 100 characters in length.",
        },
        notNull: {
          msg: "Please enter an Email address",
        },
      },
    },
    userProfile: {
      type: DataTypes.ENUM("Admin", "Basic"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter the User Profile",
        },
      },
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        len: [8, 200],
        notNull: {
          msg: "Please enter the password",
        },
      },
    },
    userStatus: {
      type: DataTypes.ENUM("Enabled", "Disabled"),
      allowNull: false,
      defaultValue: "Enabled",
      
    },
    userImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
      
  },

  {
    sequelize,
    modelName: "user",
  }
);


module.exports = { User };
