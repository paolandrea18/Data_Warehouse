/* Configure Database */
const { City } = require("../database/models/citiesModel");
const { Country } = require("../database/models/countriesModel");
const { Region } = require("../database/models/regionsModel");

const { Op } = require("sequelize");

module.exports = { 

    /* Middleware Find City  by ID */

    async findCity(req, res, next) {
        let city = await City.findOne({ where: { cityID: req.params.id } });

        if (!city) {
            res.status(404).json({ 
                status: 404,
                ok: false,
                title: 'Not Found',
                detail: 'There are no Cities registered in the database',
                message: 'City not found'});
        } else {
            req.city = city;
            next();
        }
    },

    /* Middleware Find City by ID Include Country and Region */

    async findCityIncludeCountry(req, res, next) {
        let city = await City.findOne({ 
            where: { cityID: req.params.id },
            include: [
                {
                  model: Country,
                  attributes: [
                    "countryID",
                    "countryName"
                  ],
                  include: [
                      {
                        model: Region,
                        attributes: [
                        "regionID",
                        "regionName",
                        ],
                      }
                  ]
                },
              ], 
        });

        if (!city) {
            res.status(404).json({ 
                status: 404,
                ok: false,
                title: 'Not Found',
                detail: 'There are no Cities registered in the database',
                message: 'City not found'
             });
        } else {
            req.city = city;
            next();
        }
    },

    /* Create a City */

    async createCity(req, res) {
        let city = await City.create({
            countryID: req.body.countryID,
            cityName: req.body.cityName,
        
        });

        res.status(201).json({ 
            city,
            status: 201,
            ok: true,
            title: 'Successful request',
            message: "Created" });
    },

    /* Get Cities */

    async getAllCities(req, res) {
        City.findAll({ 
            include: [
                {
                  model: Country,
                  attributes: [
                    "countryID",
                    "countryName"
                  ],
                  include: [
                      {
                        model: Region,
                        attributes: [
                        "regionID",
                        "regionName",
                        ],
                      }
                  ]
                },
              ], 
            }).then((cities) => {
            if (!cities) {
                res.status(404).json({ 
                    status: 404,
                    ok: false,
                    title: 'Not Found',
                    detail: 'There are no Cities registered in the database',
                    message: 'City not found'});
            } else { 
                res.status(200).json({
                    cities,
                    status: 200,
                    ok: true,
                    title: 'Successful request',
                    message: 'City Found',
                  });
            }
        });
    },

    /* Get City by ID */

    async getCityByID(req, res) {
        res.status(200).json({
            city: req.city,
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'City Found',
          });
          
    },

    /* Get Cities by country */

    async getCitiesByCountry(req, res) {
        City.findAll({ 
            where: { countryID: req.params.id },
            include: [
                {
                  model: Country,
                  attributes: [
                    "countryID",
                    "countryName"
                  ],
                  include: [
                      {
                        model: Region,
                        attributes: [
                        "regionID",
                        "regionName",
                        ],
                      }
                  ]
                },
              ], 
            }).then((cities) => {
            if (!cities) {
                res.status(404).json({ 
                    status: 404,
                    ok: false,
                    title: 'Not Found',
                    detail: 'There are no cities associated with this Country',
                    message: 'City not found'
                 });
            } else { 
                res.status(200).json({
                    cities,
                    status: 200,
                    ok: true,
                    title: 'Successful request',
                    message: 'City Found',
                  });
            }
            
        });
    },

    /* Update City */

    async updateCity(req, res) {

        req.city.countryID = req.body.countryID,
        req.city.cityName = req.body.cityName,

        req.city.save().then((city) => {
        res.status(200).json({ 
            city,
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'City has been updated'
          });
        });
    },


    /* Delete City */

    async deleteCity(req, res) {

        req.city.destroy().then(() => {
        res.status(200).json({ 
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'City has been deleted'
          });
        });
    },


}