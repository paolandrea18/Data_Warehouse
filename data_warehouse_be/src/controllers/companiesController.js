/* Configure Database */
const { Company } = require("../database/models/companyModels");
const { City } = require("../database/models/citiesModel");
const { Country } = require("../database/models/countriesModel");
const { Region } = require("../database/models/regionsModel");

const { Op } = require("sequelize");

module.exports = {
  /* Middleware Find Company by ID */

  async findCompany(req, res, next) {
    let company = await Company.findOne({
      where: { companyID: req.params.id },
    });

    if (!company) {
      res.status(404).json({
        status: 404,
        ok: false,
        title: "Not Found",
        detail: "There are no Companies registered in the database",
        message: "Company not found",
      });
    } else {
      req.company = company;
      next();
    }
  },

  /* Middleware Find City by ID Include Country and Region */

  async findCompanyIncludeCity(req, res, next) {
    let company = await Company.findOne({
      where: { companyID: req.params.id },
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
      ],
    });

    if (!company) {
      res.status(404).json({
        status: 404,
        ok: false,
        title: "Not Found",
        detail: "This company does not exist in the database",
        message: "Company not found",
      });
    } else {
      req.company = company;
      next();
    }
  },

  /* Create a Company */

  async createCompany(req, res) {
    let company = await Company.create({
      cityID: req.body.cityID,
      companyName: req.body.companyName,
      companyAddress: req.body.companyAddress,
      companyEmail: req.body.companyEmail,
      companyPhone: req.body.companyPhone,
    });

    res.status(201).json({
      company,
      status: 201,
      ok: true,
      title: "Successful request",
      message: "Created",
    });
  },

  /* Get Companies */

  async getAllCompanies(req, res) {
    Company.findAll({
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
      ],
    }).then((companies) => {
      if (!companies) {
        res.status(404).json({
          status: 404,
          ok: false,
          title: "Not Found",
          detail: "There are no Companies registered in the database",
          message: "Company not found",
        });
      } else {
        res.status(200).json({
          companies,
          status: 200,
          ok: true,
          title: "Successful request",
          message: "Company Found",
        });
      }
    });
  },

  /* Get Company by ID */

  async getCompanyByID(req, res) {
    res.status(200).json({
      company: req.company,
      status: 200,
      ok: true,
      title: "Successful request",
      message: "Company Found",
    });
  },

  /* Update Company */

  async updateCompany(req, res) {
      req.company.cityID = req.body.cityID,
      req.company.companyName = req.body.companyName,
      req.company.companyAddress = req.body.companyAddress,
      req.company.companyEmail = req.body.companyEmail,
      req.company.companyPhone = req.body.companyPhone,
      req.company.save().then((company) => {
        res.status(200).json({
          company,
          status: 200,
          ok: true,
          title: "Successful request",
          message: "Company has been updated",
        });
      });
  },

  /* Delete Company */

  async deleteCompany(req, res) {
    req.company.destroy().then(() => {
      res.status(200).json({
        status: 200,
        ok: true,
        title: "Successful request",
        message: "Company has been deleted",
      });
    });
  },
};
