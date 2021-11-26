const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

const { City } = require("./citiesModel");

/**
 * Companies Model
 */

 class Company extends Model {}

 Company.init(
    {
      // attributes
    companyID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    cityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
        msg: "This Company name is already taken.",
        },
        validate: {
        len: [2, 100], // only allow values with length between 3 and 100
        notNull: {
            msg: "Please enter the Company name",
        },
        },
    },
    companyAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        len: [5, 100], // only allow values with length between 3 and 100
        notNull: {
            msg: "Please enter the Company Address",
        },
        },
    },
    companyEmail: {
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
     companyPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true, // will only allow numbers
          len: {
            args: [7, 20],
            msg: "Phone number must be between 7 and 10 characters in length.",
          },
          notNull: {
            msg: "Please enter a phone number",
          },
        },
      },
     
    },
  
    {
      sequelize,
      modelName: "Company",
    }
  );

 /**
 * Associations
 */
 
  City.hasMany(Company, {
    foreignKey: { name: "cityID", allowNull: false },
  });

  Company.belongsTo(City, {
    foreignKey: { name: "cityID", allowNull: false },
  });

  module.exports = { Company };

 