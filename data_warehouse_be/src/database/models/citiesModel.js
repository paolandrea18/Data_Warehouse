const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

const { Country } = require("./countriesModel");

/**
 * Cities Model
 */

 class City extends Model {}

 City.init(
   {
     // attributes
     cityID: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     countryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
     },
     cityName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This City name is already taken.",
        },
        validate: {
          len: [2, 100], // only allow values with length between 3 and 100
          notNull: {
            msg: "Please enter the City name",
          },
        },
      },
       
   },
 
   {
     sequelize,
     modelName: "City",
   }
 );

 /**
 * Associations
 */
 
  Country.hasMany(City, {
    foreignKey: { name: "countryID", allowNull: false },
  });

  City.belongsTo(Country, {
    foreignKey: { name: "countryID", allowNull: false },
  });
 
 module.exports = { City };
 