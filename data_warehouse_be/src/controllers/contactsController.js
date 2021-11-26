/* Configure Database */
const { Contact } = require("../database/models/contactsModel");
const { Company } = require("../database/models/companyModels");
const { Chanel } = require("../database/models/chanelsModel");
const { City } = require("../database/models/citiesModel");
const { Country } = require("../database/models/countriesModel");
const { Region } = require("../database/models/regionsModel");

//const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");



module.exports = {
  /* Middleware Find contact by ID */

  async findContact(req, rest, next) {
    let contact = await Contact.findOne({
      where: { contactID: req.params.id },
    });

    if (!contact) {
      rest.status(404).json({
        status: 404,
        ok: false,
        title: "Not Found",
        detail: "This Contact does not exist in the database",
        message: "Contact not found",
      });
    } else {
      req.contact = contact;
      next();
    }
  },

  /* Middleware Find Contact by ID Include all */

  async findContactIncludeCompany(req, res, next) {
    let contact = await Contact.findOne({
      where: { contactID: req.params.id },
      include: [
        {
          model: City,
          attributes: ["cityID", "cityName"],
          include: [
            {
              model: Country,
              attributes: ["countryID", "countryName"],
              include: [
                {
                  model: Region,
                  attributes: ["regionID", "regionName"],
                },
              ],
            },
          ],
        },
        {
          model: Company,
          attributes: ["companyID", "companyName"],
        },
        {
          model: Chanel,
          attributes: [
            "chanelID",
            "contactChanel",
            "contactAccount",
            "contactPreferences",
          ],
        },
      ], 
    });

    if (!contact) {
      res.status(404).json({
        status: 404,
        ok: false,
        title: "Not Found",
        detail: "This Contact does not exist in the database",
        message: "Company not found",
      });
    } else {
      req.contact = contact;
      next();
    }
  },

  /* Create Contact */

  async createContact(req, res) {
    let contact = await Contact.create({
      companyID: req.body.companyID,
      cityID: req.body.cityID,
      contactName: req.body.contactName,
      contactLastName: req.body.contactLastName,
      contactEmail: req.body.contactEmail,
      contactPosition: req.body.contactPosition,
      contactAddress: req.body.contactAddress,
      contactInterest: req.body.contactInterest,
      contactImg: req.body.contactImg,
    });

    res.status(201).json({
      contact,
      status: 201,
      ok: true,
      title: "Successful request",
      message: "Created",
    });
  },

  /* Get Contacts */

  async getAllContacts(req, res) {
    let orderBy = req.query.orderBy;
    let orderByDirection = req.query.orderByDirection;
    console.log("orderBy", orderBy);
    console.log("orderByDirection", orderByDirection);
    /* Get Contacts ORDER BY COUNTRY */
    if (orderBy == "countryName"){
      Contact.findAll({
        order: [
          [City, Country, `${orderBy}`, `${orderByDirection}`],
        ],
        include: [
          {
            model: City,
            attributes: ["cityID", "cityName"],
            include: [
              {
                model: Country,
                attributes: ["countryID", "countryName"],
                include: [
                  {
                    model: Region,
                    attributes: ["regionID", "regionName"],
                  },
                ],
              },
            ],
          },
          {
            model: Company,
            attributes: ["companyID", "companyName"],
          },
          {
            model: Chanel,
            attributes: [
              "chanelID",
              "contactChanel",
              "contactAccount",
              "contactPreferences",
            ],
          },
        ], 
      }).then((contacts) => {
        if (!contacts) {
          res.status(404).json({
            status: 404,
            ok: false,
            title: "Not Found",
            detail: "There are no Contacts registered in the database",
            message: "Contact not found",
          });
        } else {
          res.status(200).json({
            contacts,
            status: 200,
            ok: true,
            title: "Successful request",
            message: "Contact Found",
          });
        }
      });
    } else if (orderBy == "companyName") {
      /* Get Contacts ORDER BY COMPANY */
      Contact.findAll({
        order: [
          [Company, `${orderBy}`, `${orderByDirection}`],
        ],
        include: [
          {
            model: City,
            attributes: ["cityID", "cityName"],
            include: [
              {
                model: Country,
                attributes: ["countryID", "countryName"],
                include: [
                  {
                    model: Region,
                    attributes: ["regionID", "regionName"],
                  },
                ],
              },
            ],
          },
          {
            model: Company,
            attributes: ["companyID", "companyName"],
          },
          {
            model: Chanel,
            attributes: [
              "chanelID",
              "contactChanel",
              "contactAccount",
              "contactPreferences",
            ],
          },
        ], 
      }).then((contacts) => {
        if (!contacts) {
          res.status(404).json({
            status: 404,
            ok: false,
            title: "Not Found",
            detail: "There are no Contacts registered in the database",
            message: "Contact not found",
          });
        } else {
          res.status(200).json({
            contacts,
            status: 200,
            ok: true,
            title: "Successful request",
            message: "Contact Found",
          });
        }
      });
    } else {
        Contact.findAll({
          order: [
            [`${orderBy}`, `${orderByDirection}`],
          ],
          include: [
            {
              model: City,
              attributes: ["cityID", "cityName"],
              include: [
                {
                  model: Country,
                  attributes: ["countryID", "countryName"],
                  include: [
                    {
                      model: Region,
                      attributes: ["regionID", "regionName"],
                    },
                  ],
                },
              ],
            },
            {
              model: Company,
              attributes: ["companyID", "companyName"],
            },
            {
              model: Chanel,
              attributes: [
                "chanelID",
                "contactChanel",
                "contactAccount",
                "contactPreferences",
              ],
            },
          ], 
        }).then((contacts) => {
          if (!contacts) {
            res.status(404).json({
              status: 404,
              ok: false,
              title: "Not Found",
              detail: "There are no Contacts registered in the database",
              message: "Contact not found",
            });
          } else {
            res.status(200).json({
              contacts,
              status: 200,
              ok: true,
              title: "Successful request",
              message: "Contact Found",
            });
          }
        });

      }
    
  },

  /* Get Contact by ID */

  async getContactByID(req, res) {
    res.status(200).json({
      contact: req.contact,
      status: 200,
      ok: true,
      title: "Successful request",
      message: "Contact Found",
    });
  },

  /* Update Contact */

  async updateContact(req, res) {
      req.contact.companyID = req.body.companyID,
      req.contact.cityID = req.body.cityID,
      req.contact.contactName = req.body.contactName,
      req.contact.contactLastName = req.body.contactLastName,
      req.contact.contactEmail = req.body.contactEmail,
      req.contact.contactPosition = req.body.contactPosition,
      req.contact.contactAddress = req.body.contactAddress,
      req.contact.contactInterest = req.body.contactInterest,
      req.contact.contactImg = req.body.contactImg,
      req.contact.save().then((contact) => {
        res.status(200).json({
          contact,
          status: 200,
          ok: true,
          title: "Successful request",
          message: "Contact updated",
        });
      });
  },

  /* Delete Contact */

  async deleteContact(req, res) {
    req.contact.destroy().then(() => {
      res.status(200).json({
        status: 200,
        ok: true,
        title: "Successful request",
        message: "Contact deleted",
      });
    });
  },
  
  /* Filter Contact */
  async filterContact(req, res) {
    console.log("Palabra de busqueda: ", req.body.searchString);
    Contact.findAll({
      where: {    
        [Op.or]: [
          { contactName: { [Op.like]: `%${req.body.searchString}%` } },
          { contactLastName: { [Op.like]: `%${req.body.searchString}%` } },
          { contactEmail: { [Op.like]: `%${req.body.searchString}%` } },
          { contactPosition: { [Op.like]: `%${req.body.searchString}%` } },
          { '$City.cityName$': { [Op.like]: `%${req.body.searchString}%` } },
          { '$City.Country.countryName$': { [Op.like]: `%${req.body.searchString}%` } },
          { '$City.Country.Region.regionName$': { [Op.like]: `%${req.body.searchString}%` } },
          { '$Company.companyName$': { [Op.like]: `%${req.body.searchString}%` } },
        ]
      },
      include: [
        {
          model: City,
          attributes: ["cityID", "cityName"],
          include: [
            {
              model: Country,
              attributes: ["countryID", "countryName"],
              include: [
                {
                  model: Region,
                  attributes: ["regionID", "regionName"],
                },
              ],
            },
          ],
        },
        {
          model: Company,
          attributes: ["companyID", "companyName"],
        },
        {
          model: Chanel,
          attributes: [
            "chanelID",
            "contactChanel",
            "contactAccount",
            "contactPreferences",
          ],
        },
      ], 
    }).then((contacts) => {
      if (!contacts || contacts.length == 0) {
        res.status(404).json({
          status: 404,
          ok: false,
          title: "Not Found",
          detail: "There are no Contacts registered in the database",
          message: "No se encontraron contactos relacionados con la búsqueda",
        });
      } else {
        res.status(200).json({
          contacts,
          status: 200,
          ok: true,
          title: "Successful request",
          message: "Contact Found",
        });
      }
    });

  },


};
