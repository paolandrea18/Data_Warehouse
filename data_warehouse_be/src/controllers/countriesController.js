/* Configure Database */
const { Region } = require("../database/models/regionsModel");
const { Country } = require("../database/models/countriesModel");
const { City } = require("../database/models/citiesModel");


const { Op } = require("sequelize");

module.exports = {

/* Middleware Find Country  by ID */

    async findCountry(req, res, next) {
        let country = await Country.findOne({ 
            where: { countryID: req.params.id },
            include: [
                {
                  model: Region,
                  attributes: [
                    "regionName",
                    "regionID",
                  ],
                },
              ],
            include: [
                {
                  model: City,
                  attributes: [
                    "cityName",
                    "cityID",
                  ],
                },
              ],
        });

        if (!country) {
            res.status(404).json({ 
                status: 404,
                ok: false,
                title: 'Not Found',
                detail: 'There are no registered Countries in the database',
                message: 'Country not found' });
        } else {
            req.country = country;
            next();
        }
    },


    /* Middleware Find Region by ID Include Region */

    async findCountryIncludeRegion(req, res, next) {
        let country = await Country.findOne({ 
            where: { countryID: req.params.id },
            include: [
                {
                  model: Region,
                  attributes: [
                    "regionName",
                    "regionID",
                  ],
                },
              ],
            include: [
                {
                  model: City,
                  attributes: [
                    "cityName",
                    "cityID",
                  ],
                },
              ],
        });

        if (!country) {
            res.status(404).json({ 
                status: 404,
                ok: false,
                title: 'Not Found',
                detail: 'There are no registered Countries in the database',
                message: 'Country not found' });
        } else {
            req.country = country;
            next();
        }
    },


/* Create a Country */

    async createCountry(req, res) {
        let country = await Country.create({
            regionID: req.body.regionID,
            countryName: req.body.countryName,
        
        });

        res.status(201).json({ 
            country,
            status: 201,
            ok: true,
            title: 'Successful request',
            message: "Created" });
    },

/* Get countries */

    async getAllCountries(req, res) {
        Country.findAll({ 
            include: [
                {
                  model: Region,
                  attributes: [
                    "regionName",
                    "regionID",
                  ],
                },
              ],
              include: [
                {
                  model: City,
                  attributes: [
                    "cityName",
                    "cityID",
                  ],
                },
              ],
            }).then((countries) => {
            if (!countries) {
                res.status(404).json({ 
                    status: 404,
                    ok: false,
                    title: 'Not Found',
                    detail: 'There are no registered Countries in the database',
                    message: 'Country not found' });
            } else { 
                res.status(200).json({
                    countries,
                    status: 200,
                    ok: true,
                    title: 'Successful request',
                    message: 'Country Found',
                  });
            }
        });
    },

/* Get Country by ID */

    async getCountryByID(req, res) {
        res.status(200).json({
            country: req.country,
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'Country Found',
          });
    },

/* Get Country by Region */

    async getCountriesByRegion(req, res) {
        Country.findAll({ 
            where: { regionID: req.params.id },
            include: [
                {
                  model: Region,
                  attributes: [
                    "regionName",
                    "regionID",
                  ],
                },
              ],
              include: [
                {
                  model: City,
                  attributes: [
                    "cityName",
                    "cityID",
                  ],
                },
              ],
            }).then((countries) => {
            if (!countries) {
                res.status(404).json({ 
                    status: 404,
                    ok: false,
                    title: 'Not Found',
                    detail: 'There are no countries associated with this region',
                    message: 'Country not found'
                 });
            } else { 
                res.status(200).json({
                    countries,
                    status: 200,
                    ok: true,
                    title: 'Successful request',
                    message: 'Country Found',
                  });
            }
            
        });
    },

/* Update Country */

    async updateCountry(req, res) {
      console.log("REGIONID", req.country.regionID);
      console.log("REGIONID BODY", req.body.regionID);
        req.country.regionID = req.body.regionID,
        req.country.countryName = req.body.countryName,

        req.country.save().then((country) => {
        res.status(200).json({ 
            country,
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'Country has been updated'
          });
        });
    },

/* Delete Country */

    async deleteCountry(req, res) {
        
        req.country.destroy().then(() => {
        res.status(200).json({ 
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'Country has been deleted'
         });
        });
    },


};

    