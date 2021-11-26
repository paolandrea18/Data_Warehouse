/**
 * Global variables
 */

/* Login */
const URL_LOGIN = "http://localhost:4000/login";

/* Register */
const URL_REGISTER = "http://localhost:4000/register";

/* Get all Users */
const URL_GETALLUSERS = "http://localhost:4000/allusers";

/* Get user by ID */
const URL_GETUSERID = "http://localhost:4000/user/";

/* Create Region */
const URL_NEWREGION = "http://localhost:4000/regions/new";

/* Get All Regions */
const URL_GETALLREGIONS = "http://localhost:4000/regions/";

/* Create Country */
const URL_NEWCOUNTRY = "http://localhost:4000/country/new";

/* Get Countries */
const URL_GETCOUNTRY = "http://localhost:4000/countries/";

/* Get Countries BY ID REGION */
const URL_GETCOUNTRYBYREGION = "http://localhost:4000/countries/region/";

/* Create City */
const URL_NEWCITY = "http://localhost:4000/city/new";

/* Get Cities */
const URL_GETCITY = "http://localhost:4000/cities/";

/* Get Cities */
const URL_GETCITYBYCOUNTRY = "http://localhost:4000/cities/country/";

/* Create Company */
const URL_NEWCOMPANY = "http://localhost:4000/company/new";

/* Get Companies */
const URL_GETCOMPANY = "http://localhost:4000/companies/";

/* Create Contact */
const URL_NEWCONTACT = "http://localhost:4000/contact/new";

/* Get Contact */
const URL_GETCONTACT = "http://localhost:4000/contacts/";

/* Filter Contact */
const URL_FILTERCONTACT = "http://localhost:4000/contacts/filter/";

/* Create Chanel */
const URL_NEWCHANEL = "http://localhost:4000/chanel/new";

/* Get Chanel */
const URL_GETCHANEL = "http://localhost:4000/chanels/";

/* Token - Localstorage */
const LOCAL_STORAGE_TOKEN = "userToken";

/* User Profile - Localstorage */
const LOCAL_STORAGE_USER = "userData";

export {
  URL_LOGIN,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
  URL_REGISTER,
  URL_GETALLUSERS,
  URL_GETUSERID,
  URL_NEWREGION,
  URL_GETALLREGIONS,
  URL_NEWCOUNTRY,
  URL_GETCOUNTRY,
  URL_GETCOUNTRYBYREGION,
  URL_NEWCITY,
  URL_GETCITY,
  URL_GETCITYBYCOUNTRY,
  URL_NEWCOMPANY,
  URL_GETCOMPANY,
  URL_NEWCONTACT,
  URL_GETCONTACT,
  URL_FILTERCONTACT,
  URL_NEWCHANEL,
  URL_GETCHANEL,
};
