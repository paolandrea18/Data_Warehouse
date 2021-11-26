const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

const { Contact } = require("./contactsModel");

/**
 * Contact Chanels Model
 */

class Chanel extends Model {}

Chanel.init(
  {
    // attributes
    chanelID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    contactID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contactChanel: {
      type: DataTypes.ENUM("Telefono", "Email","WhatsAPP", "LinkedIn"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter the Contact Chanel",
        },
      },
    },
    contactAccount: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 200], // only allow values with length between 3 and 100
        notNull: {
          msg: "Please enter the Contact Account",
        },
      },
    },
    contactPreferences: {
      type: DataTypes.ENUM("Sin preferencia", "Canal favorito","No molestar"),
      allowNull: false,
      defaultValue: "Sin preferencia",
    },
    
  },

  {
    sequelize,
    modelName: "chanel",
  }
);

/**
 * Associations
 */

Contact.hasMany(Chanel, {
  foreignKey: { name: "contactID", allowNull: false },
});

Chanel.belongsTo(Contact, {
  foreignKey: { name: "contactID", allowNull: false },
});

module.exports = { Chanel };
