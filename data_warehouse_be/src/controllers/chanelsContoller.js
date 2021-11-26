/* Configure Database */
const { Contact } = require("../database/models/contactsModel");
const { Chanel } = require("../database/models/chanelsModel");

const { Op } = require("sequelize");

module.exports = {

/* Create Chanel */

  async createChanel(req, res) {
    let chanel = await Chanel.create({
      contactID: req.body.contactID,
      contactChanel: req.body.contactChanel,
      contactAccount: req.body.contactAccount,
      contactPreferences: req.body.contactPreferences,
    });

    res.status(201).json({
      chanel,
      status: 201,
      ok: true,
      title: "Successful request",
      message: "Created",
    });
  }, 

  /* Middleware Find chanel by ID */

  async findChanelByID(req, rest, next) {
    let chanel = await Chanel.findOne({
      where: { chanelID: req.params.id },
    });

    if (!chanel) {
      rest.status(404).json({
        status: 404,
        ok: false,
        title: "Not Found",
        detail: "This Chanel does not exist in the database",
        message: "Chanel not found",
      });
    } else {
      req.chanel = chanel;
      next();
    }
  },

/* Get all Chanels */

   getAllChanels(req, res) {
    Chanel.findAll().then((chanels) => {
      res.status(200).json({
        chanels,
        status: 200,
        ok: true,
        title: 'Successful request',
        message: 'Chanel Found',
      });
    });
  },

 /* Get Chanel by ID */

 getChanelByID(req, res) {
    res.status(200).json({
      chanel: req.chanel,
      status: 200,
      ok: true,
      title: 'Successful request',
      message: 'Chanel Found',
    });
  },

  /* Get Chanels by Contact ID */

  async getChanelByContactID(req, res) {
    Chanel.findAll({ 
        where: { contactID: req.params.id },
        include: [
            {
              model: Contact,
              attributes: [
                "contactID",
                "contactName",
                "contactLastName",
              ],
            },
          ],
        
        }).then((chanels) => {
        if (!chanels) {
            res.status(404).json({ 
                status: 404,
                ok: false,
                title: 'Not Found',
                detail: 'There are no chanels associated with this region',
                message: 'Chanel not found'
             });
        } else { 
            res.status(200).json({
                chanels,
                status: 200,
                ok: true,
                title: 'Successful request',
                message: 'Chanel Found',
              });
        }       
    });
   },

   /* Update Chanel */

   async updateChanel(req, res) {
    req.chanel.contactID = req.body.contactID,
    req.chanel.contactChanel = req.body.contactChanel,
    req.chanel.contactAccount = req.body.contactAccount,
    req.chanel.contactInterest = req.body.contactInterest,
    req.chanel.contactPreferences = req.body.contactPreferences,

    req.chanel.save().then((chanel) => {
    res.status(200).json({ 
        chanel,
        status: 200,
        ok: true,
        title: 'Successful request',
        message: 'Chanel Updated'
      });
    });
   },

   /* Delete Chanel */

  async deleteChanel(req, res) {
    req.chanel.destroy().then(() => {
      res.status(200).json({
        status: 200,
        ok: true,
        title: "Successful request",
        message: "Chanel deleted",
      });
    });
  },

};




