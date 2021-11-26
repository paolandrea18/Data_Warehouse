const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

const { Region } = require("./regionsModel");

/**
 * Countries Model
 */

 class Country extends Model {}

 Country.init(
   {
     // attributes
     countryID: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     regionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
     },
     countryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This country name is already taken.",
        },
        validate: {
          len: [3, 100], // only allow values with length between 3 and 100
          notNull: {
            msg: "Please enter the country name",
          },
        },
      },
       
   },
 
   {
     sequelize,
     modelName: "country",
   }
 );

 /**
 * Associations
 */
 
 Region.hasMany(Country, {
  foreignKey: { name: "regionID", allowNull: false },
  });
 Country.belongsTo(Region, {
  foreignKey: { name: "regionID", allowNull: false },
  });
 
 module.exports = { Country };
 