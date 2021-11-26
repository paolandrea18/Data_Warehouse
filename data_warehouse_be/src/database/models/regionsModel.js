const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * Regions Model
 */

 class Region extends Model {}
 
 Region.init(
   {
     // attributes
     regionID: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     regionName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This region name is already taken.",
        },
        validate: {
          len: [2, 20], // only allow values with length between 3 and 20
          notNull: {
            msg: "Please enter the region name",
          },
        },
      },
        
   },
 
   {
     sequelize,
     modelName: "region",
   }
 );
 
 
 module.exports = { Region };
 