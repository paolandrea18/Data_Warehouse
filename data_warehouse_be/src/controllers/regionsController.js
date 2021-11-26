/* Configure Database */
const { Region } = require("../database/models/regionsModel");
const { Country } = require("../database/models/countriesModel");
const { City } = require("../database/models/citiesModel");



module.exports = {

    /* Middleware Find Region  by ID */

    async findRegion(req, res, next) {
        let region = await Region.findOne({ 
            where: { regionID: req.params.id },
            include: [
                {
                  model: Country,
                  attributes: [
                    "countryID",
                    "countryName"
                  ],
                  include: [ {
                    model: City,
                    attributes: [
                        "cityName",
                        "cityID",
                      ],
                    }  
                  ],
                },
              ], 
        });

        if (!region) {
            res.status(404).json({ 
                status: 404,
                ok: false,
                title: 'Not Found',
                detail: 'There are no registered users in the database',
                message: 'Region not found' });
        } else {
            req.region = region;
            next();
        }
    },

    /* Create a Region */

    async createRegion(req, res) {
        let region = await Region.create({
            regionName: req.body.regionName,
          
        });
    
        res.status(201).json({ 
            region,
            status: 201,
            ok: true,
            title: 'Successful request',
            message: "Created" });
    },

    /* Get Regions */

    async getAllRegions(req, res) {
        Region.findAll({ include: {
            model: Country,
            attributes: [
                "countryName",
                "countryID",
              ],
            include: {
                model: City,
                attributes: [
                    "cityName",
                    "cityID",
                  ],
            }
         }             
        }).then((regions) => {
            res.status(200).json({
                regions,
                status: 200,
                ok: true,
                title: 'Successful request',
                message: 'Regions Found',
              });
        });
    },

    /* Get Regions */

    async getAllRegionsCountryCity(req, res) {
        Region.findAll({ 
            include: {
            model: Country,
            attributes: [
                "countryName",
                "countryID",
              ],
            include: {
                model: City,
                attributes: [
                    "cityName",
                    "cityID",
                  ],
            }
         }             
        }).then((regions) => {
            res.status(200).json({
                regions,
                status: 200,
                ok: true,
                title: 'Successful request',
                message: 'Regions Found',
              });
        });
    },

    /* Get Region by ID */

    async getRegionByID(req, res) {
        res.status(200).json({
            region: req.region,
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'Region Found',
          });
    },

    /* Update Region */

    async updateRegion(req, res) {
        req.region.regionName = req.body.regionName;

        req.region.save().then((region) => {
        res.status(200).json({ 
            region,
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'Updated region' });
        });
    },

    /* Delete Region */

    async deleteRegion(req, res) {
        
        req.region.destroy().then(() => {
        res.status(200).json({ 
            status: 200,
            ok: true,
            title: 'Successful request',
            message: 'Deleted region' });
        });
    },

};