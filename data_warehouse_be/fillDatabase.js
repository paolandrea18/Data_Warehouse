const sequelize = require("./src/database/db");

const { User } = require("./src/database/models/usersModel");
const { Region } = require("./src/database/models/regionsModel");
const { Country } = require("./src/database/models/countriesModel");
const { City } = require("./src/database/models/citiesModel");
const { Company } = require("./src/database/models/companyModels");
const { Contact } = require("./src/database/models/contactsModel");
const { Chanel } = require("./src/database/models/chanelsModel");

const bcrypt = require("bcrypt");
const authConfig = require("./config/auth");

const saltRounds = Number.parseInt(authConfig.rounds);

const hash_User_1 = bcrypt.hashSync("12345678901", saltRounds);
const hash_User_2 = bcrypt.hashSync("45678901234", saltRounds);
const hash_User_3 = bcrypt.hashSync("78901234567", saltRounds);
const hash_User_4 = bcrypt.hashSync("09876543210", saltRounds);
const hash_User_5 = bcrypt.hashSync("765765765765", saltRounds);

const users = [
  {
    userName: "Leon Scott",
    userLastName: "Kennedy",
    userEmail: "leosk@acamica.com",
    userProfile: "Admin",
    userPassword: hash_User_1,
    userImg: "../data_warehouse_be/assets/userImg/leon.jpg",
  },
  {
    userName: "Alice",
    userLastName: "Prospero",
    userEmail: "prosperoalice@acamica.com",
    userProfile: "Admin",
    userPassword: hash_User_2,
    userImg: "../data_warehouse_be/assets/userImg/alice.jpg",
  },
  {
    userName: "Claire",
    userLastName: "Redfield",
    userEmail: "c_redfield@acamica.com",
    userProfile: "Admin",
    userPassword: hash_User_3,
    userImg: "../data_warehouse_be/assets/userImg/claire.jpg",
  },
  {
    userName: "Ashley",
    userLastName: "Graham",
    userEmail: "ashgraham@acamica.com",
    userProfile: "Basic",
    userPassword: hash_User_4,
    userImg: "../data_warehouse_be/assets/userImg/ashley.png",
  },
  {
    userName: "Jill",
    userLastName: "Valentine",
    userEmail: "valentine@acamica.com",
    userProfile: "Basic",
    userPassword: hash_User_5,
    userImg: "../data_warehouse_be/assets/userImg/jill.jpg",
  },
];

// Regions

const regions = [
  {
    regionName: "EUROPE",
  },
  {
    regionName: "CENTRAL AND SOUTH AMERICA",
  },
  {
    regionName: "OTHERS",
  },
  {
    regionName: "NORTH AMERICA",
  },
  {
    regionName: "ASIA PACIFIC",
  },
];

// Countries

const countries = [
  {
    regionID: "1",
    countryName: "Argentina",
  },
  {
    regionID: "1",
    countryName: "Colombia",
  },
  {
    regionID: "1",
    countryName: "Chile",
  },
  {
    regionID: "1",
    countryName: "Uruguay",
  },
  {
    regionID: "1",
    countryName: "Mexico",
  },
  {
    regionID: "4",
    countryName: "Estados Unidos",
  },
  {
    regionID: "3",
    countryName: "Fiji",
  },
  {
    regionID: "3",
    countryName: "Maldives",
  },
  {
    regionID: "2",
    countryName: "Alemania",
  },
  {
    regionID: "2",
    countryName: "España",
  },
  {
    regionID: "5",
    countryName: "Japón",
  },
];

// Cities

const cities = [
  {
    countryID: "1",
    cityName: "Buenos Aires",
  },
  {
    countryID: "1",
    cityName: "Córdoba",
  },
  {
    countryID: "2",
    cityName: "Bogotá",
  },
  {
    countryID: "2",
    cityName: "Medellín",
  },
  {
    countryID: "2",
    cityName: "Bucaramanga",
  },
  {
    countryID: "3",
    cityName: "Santiago",
  },
  {
    countryID: "4",
    cityName: "Montevideo",
  },
  {
    countryID: "5",
    cityName: "Ciudad de México",
  },
  {
    countryID: "6",
    cityName: "Florida",
  },
  {
    countryID: "6",
    cityName: "Texas",
  },
  {
    countryID: "9",
    cityName: "Berlín",
  },
  {
    countryID: "10",
    cityName: "Barcelona",
  },
  {
    countryID: "11",
    cityName: "Tokio",
  },
  {
    countryID: "11",
    cityName: "Kioto",
  },
];

// Companies

const companies = [
  {
    cityID: "1",
    companyName: "Acamica",
    companyAddress: "Humboldt 1967, C1414 CTU",
    companyEmail: "acamica@acamica.com",
    companyPhone: "3151234567",
  },
  {
    cityID: "6",
    companyName: "Cencosud",
    companyAddress: "Av. Presidente Kennedy 9001",
    companyEmail: "cencosud@cencosud.com",
    companyPhone: "6003000000",
  },
  {
    cityID: "7",
    companyName: "IBM",
    companyAddress: "La Cumparsita 1475, 11200",
    companyEmail: "ibm@ibm.com",
    companyPhone: "59824093617",
  },
  {
    cityID: "12",
    companyName: "SEAT",
    companyAddress: "Gran Via de les Corts Catalanes, 140",
    companyEmail: "seat@seat.com",
    companyPhone: "34933321100",
  },
  {
    cityID: "4",
    companyName: "NOEL",
    companyAddress: "Carrera 52 # 2 - 48",
    companyEmail: "noel@noel.com",
    companyPhone: "3659999",
  },
  {
    cityID: "10",
    companyName: "American Airlines",
    companyAddress: "Forth Worth, TX",
    companyEmail: "aairlines@aairlines.com",
    companyPhone: "8179631234",
  },
];

// Contacts

const contacts = [
  {
    companyID: "1",
    cityID: "1",
    contactName: "Julieta",
    contactLastName: "Capuleto",
    contactEmail: "juliet@acamica.com",
    contactPosition: "Full Stack",
    contactAddress: "Av. Santafe 4815 Interior 12",
    contactInterest: "0",
    contactImg: "",
  },
  {
    companyID: "2",
    cityID: "3",
    contactName: "Davina",
    contactLastName: "Claire",
    contactEmail: "davina@cencosud.com",
    contactPosition: "Graphic Designer",
    contactAddress: "Calle 100 # 13 - 25 apto 601",
    contactInterest: "25",
    contactImg: "",
  },
  {
    companyID: "3",
    cityID: "5",
    contactName: "Marcel",
    contactLastName: "Gerald",
    contactEmail: "mgerald@ibm.com",
    contactPosition: "UX Designer",
    contactAddress: "Calle 35 # 29 - 12",
    contactInterest: "50",
    contactImg: "",
  },
  {
    companyID: "4",
    cityID: "7",
    contactName: "Johannes",
    contactLastName: "Elmes",
    contactEmail: "johelmes@aairlines.com",
    contactPosition: "UI Designer",
    contactAddress: "2485 Mystic Falls",
    contactInterest: "75",
    contactImg: "",
  },

  {
    companyID: "5",
    cityID: "9",
    contactName: "Arthur",
    contactLastName: "King",
    contactEmail: "aking@seat.com",
    contactPosition: "Software Architect",
    contactAddress: "Navalmoral de la Mata No. 14",
    contactInterest: "75",
    contactImg: "",
  },

  {
    companyID: "1",
    cityID: "11",
    contactName: "Klaus",
    contactLastName: "Mikaelson",
    contactEmail: "mikaelsonKlaus@acamica.com",
    contactPosition: "CEO",
    contactAddress: "HAHN Kunststoffe GmbH 1027",
    contactInterest: "75",
    contactImg: "",
  },

  {
    companyID: "2",
    cityID: "10",
    contactName: "Hailey",
    contactLastName: "Marshall",
    contactEmail: "haymar@cenconsud.com",
    contactPosition: "Sales Manager",
    contactAddress: "1813 E 6th Austin",
    contactInterest: "75",
    contactImg: "",
  },
];

// Chanels

const chanels = [
  {
    contactID: "1",
    contactChanel: "Telefono",
    contactAccount: "3151234567",
    contactPreferences: "Sin preferencia",
  },
  {
    contactID: "1",
    contactChanel: "Email",
    contactAccount: "contact1@contact.com",
    contactPreferences: "Canal favorito",
  },
  {
    contactID: "2",
    contactChanel: "WhatsAPP",
    contactAccount: "3012806263",
    contactPreferences: "No molestar",
  },
  {
    contactID: "1",
    contactChanel: "LinkedIn",
    contactAccount: "@professionalD",
    contactPreferences: "Sin preferencia",
  },
  {
    contactID: "2",
    contactChanel: "LinkedIn",
    contactAccount: "@nextlevel",
    contactPreferences: "Sin preferencia",
  },
];

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database is connected");
  })
  .then(() => {
    users.forEach((singleuser) => {
      console.log("Usuario: " + singleuser.userLastName);
      User.create(singleuser);
    });
  })
  .then(() => {
    regions.forEach((singleRegion) => {
      console.log("Región: " + singleRegion.regionName);
      Region.create(singleRegion);
    });
  })
  .then(() => {
    countries.forEach((singleCountry) => Country.create(singleCountry));
  })
  .then(() => {
    cities.forEach((singleCity) => City.create(singleCity));
  })
  .then(() => {
    companies.forEach((singleCompany) => Company.create(singleCompany));
  })
  .then(() => {
    contacts.forEach((singleContact) => Contact.create(singleContact));
  })
  .then(() => {
    chanels.forEach((singleChanel) => Chanel.create(singleChanel));
  })
  .catch((exp) => {
    console.log("User creation" + exp);
  });
