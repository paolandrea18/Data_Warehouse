/**
 * Imports
 */

import apiCompanies from "./main_servicesCompany.js";
import apiRegions from "./main_servicesRegion.js";
import {
  URL_NEWCOMPANY,
  URL_GETCOMPANY,
  URL_GETALLREGIONS,
  URL_GETCOUNTRYBYREGION,
  URL_GETCITYBYCOUNTRY,
} from "./global_variables.js";
import {
  getTokenLocalStorage,
  getUserLocalStorage,
} from "./localstorage_controller.js";

/**
 * Global Variables
 */

let allHTMLCompaniesData = "";
let allHTMLRegionsData = "";
let allHTMLCountriesData = "";
let allHTMLCitiesData = "";

let allHTMLRegionsDataEdit = "";
let allHTMLCountriesDataEdit = "";
let allHTMLCitiesDataEdit = "";

let navLinkUsers = document.getElementById("navLinkUsers");
const companiesBodyTable = document.getElementById("companiesBodyTable");
let addCompanyBtn = document.getElementById("addCompanyBtn");
let newCompanyName = document.getElementById("newCompanyName");
let newCompanyAddress = document.getElementById("newCompanyAddress");
let newCompanyEmail = document.getElementById("newCompanyEmail");
let newCompanyPhone = document.getElementById("newCompanyPhone");
let saveCompanyModalBtn = document.getElementById("saveCompanyModalBtn");

let editCompanyID = document.getElementById("editCompanyID");
let editCompanyName = document.getElementById("editCompanyName");
let editCompanyAddress = document.getElementById("editCompanyAddress");
let editCompanyEmail = document.getElementById("editCompanyEmail");
let editCompanyPhone = document.getElementById("editCompanyPhone");
let editCompanyModalBtn = document.getElementById("editCompanyModalBtn");

let deleteCompanyID = document.getElementById("deleteCompanyID");
let deleteCompanyModalBtn = document.getElementById("deleteCompanyModalBtn");

//  SELECTS

let newCompany_regionID = document.getElementById("newCompany_regionID");
let newCompany_regionSelectID = document.getElementById(
  "newCompany_regionSelectID"
);

let newCompany_countryID = document.getElementById("newCompany_CountryID");
let newCompany_countrySelectID = document.getElementById(
  "newCompany_countrySelectID"
);
let newCompany_cityID = document.getElementById("newCompany_cityID");
let newCompany_citySelectID = document.getElementById(
  "newCompany_citySelectID"
);

let editCompany_regionID = document.getElementById("editCompany_regionID");
let editCompany_regionSelectID = document.getElementById(
  "editCompany_regionSelectID"
);
let editCompany_countryID = document.getElementById("editCompany_countryID");
let editCompany_countrySelectID = document.getElementById(
  "editCompany_countrySelectID"
);
let editCompany_cityID = document.getElementById("editCompany_cityID");
let editCompany_citySelectID = document.getElementById(
  "editCompany_citySelectID"
);

// END SELECTS

/**
 * @method getCompanies
 * @description Get the companies json from the backend
 */

const getCompanies = () => {
  allHTMLCompaniesData = "";
  const { getCompaniesData } = apiCompanies;
  const token = getTokenLocalStorage();
  getCompaniesData(URL_GETCOMPANY, token)
    .then((response) => {
      getCompaniesDataJson(response);
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getCompaniesDataJson
 * @description Get company data and create rows
 * @param {array} companiesList
 * @return {string}
 */

const getCompaniesDataJson = (companiesList) => {
  companiesList.companies.forEach((companyItem) => {
    const {
      companyID,
      cityID,
      companyName,
      companyAddress,
      companyEmail,
      companyPhone,
      City,
    } = companyItem;

    allHTMLCompaniesData += htmlCompaniesRowData(
      companyID,
      cityID,
      companyName,
      companyAddress,
      companyEmail,
      companyPhone,
      City
    );
  });

  companiesBodyTable.innerHTML = allHTMLCompaniesData;
  addEventListenerEditCompanyBtnList(
    companiesBodyTable.querySelectorAll(".editCompany")
  );
  addEventListenerDeleteCompanyBtnList(
    companiesBodyTable.querySelectorAll(".deleteCompany")
  );
};

/**
 * @method htmlCompaniesRowData
 * @description Create companies html rows
 * @param {number} cityID
 * @param {string} cityName
 * @return {string}
 */

const htmlCompaniesRowData = (
  companyID,
  cityID,
  companyName,
  companyAddress,
  companyEmail,
  companyPhone,
  city
) => {
  return `<tr>
        <td class="align-middle pl-5">${companyName}</td>
        <td class="align-middle">${companyAddress}</td>
        <td class="align-middle pl-5">${companyEmail}</td>
        <td class="align-middle">${companyPhone}</td>
        <td class="align-middle">${city.cityName}</td>
        <td class="align-middle">
			<button type="button" class="btn btn-lg text-black-50 editCompany" data-id="${companyID}" data-toggle="modal" data-target="#editCompanyModal"><span style="color: #5E2129;"><i class="fa fa-pencil" aria-hidden="true"></i></span></button>		
            <button type="button" class="btn btn-lg text-black-50 ml-n3 deleteCompany" data-id="${companyID}" data-toggle="modal" data-target="#deleteCompanyModal"><span style="color: #5E2129;"><i class="fa fa-trash" aria-hidden="true"></i></span></button>
            
        </td>
    </tr>`;
};

/**
 * CRUD COMPANIES
 */

/**
 * @method createCompany
 * @description Create Company
 * @return {string}
 */

const createCompany = () => {
  const { createCompanyData } = apiCompanies;
  const token = getTokenLocalStorage();
  let citySelected = newCompany_citySelectID.value;
  const companyData = {
    cityID: citySelected,
    companyName: newCompanyName.value,
    companyAddress: newCompanyAddress.value,
    companyEmail: newCompanyEmail.value,
    companyPhone: newCompanyPhone.value,
  };
  if (newCompanyName.value === "" || newCompanyName.value.length < 2) {
    swal(
      "",
      `El nombre de la compañía debe tener mínimo dos caracteres`,
      "error"
    );
  } else if (
    newCompanyAddress.value === "" ||
    newCompanyAddress.value.length < 10
  ) {
    swal(
      "",
      `La dirección de la compañía debe tener mínimo 10 caracteres`,
      "error"
    );
  } else if (!validateEmail(newCompanyEmail.value)) {
    swal("", `Ingrese un email válido`, "error");
  } else if (newCompanyPhone.value < 10) {
    swal("", `Ingrese un Número de teléfono válido`, "error");
  } else if (newCompany_regionSelectID.value === "0") {
    swal("", `Seleccione una región`, "error");
  } else if (newCompany_countrySelectID.value === "0") {
    swal("", `Seleccione un país`, "error");
  } else if (newCompany_citySelectID.value === "0") {
    swal("", `Seleccione una ciudad`, "error");
  } else {
    createCompanyData(URL_NEWCOMPANY, companyData, token)
      .then((response) => {
        if (response.message === "Created") {
          swal(
            "",
            `La compañía ${companyData.companyName} fue creada exitosamente`,
            "success"
          );
          $("#newCompanyModal").modal("hide");
          getCompanies();
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  }
};

/**
 * @method validateEmail
 * @description: Event Listener Close Modal
 * @returns {}
 */

const validateEmail = (email) => {
  const regExpr =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExpr.test(email);
};

// EDIT CONTACT

/**
 * @method loadEditCompanyData
 * @description Render Companies List on the DOM
 * @param {number} companyID
 * @returns {string}
 */

const loadEditCompanyData = (companyID) => {
  const { getCompanyData } = apiCompanies;
  const token = getTokenLocalStorage();
  getCompanyData(URL_GETCOMPANY, token, companyID)
    .then((response) => {
      if (response.message === "Company Found") {
        editCompanyID.value = response.company.companyID;
        editCompanyName.value = response.company.companyName;
        editCompanyAddress.value = response.company.companyAddress;
        editCompanyEmail.value = response.company.companyEmail;
        editCompanyPhone.value = response.company.companyPhone;

        editCompany_regionSelectID.value =
          response.company.City.country.region.regionID;

        getCountriesEditCompany(
          editCompany_regionSelectID.value,
          response.company.City.country.countryID
        );

        getCitiesEditCompany(
          response.company.City.country.countryID,
          response.company.cityID
        );
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method editCompany
 * @description Edit company function
 * @returns {}
 */

const editCompany = () => {
  const { editCompanyData } = apiCompanies;
  const token = getTokenLocalStorage();
  const companyID = editCompanyID.value;
  const companyData = {
    cityID: editCompany_citySelectID.value,
    companyName: editCompanyName.value,
    companyAddress: editCompanyAddress.value,
    companyEmail: editCompanyEmail.value,
    companyPhone: editCompanyPhone.value,
  };
  if (editCompanyName.value === "" || editCompanyName.value.length < 2) {
    swal(
      "",
      `El nombre de la compañía debe tener mínimo dos caracteres`,
      "error"
    );
  } else if (
    editCompanyAddress.value === "" ||
    editCompanyAddress.value.length < 10
  ) {
    swal(
      "",
      `La dirección de la compañía debe tener mínimo 10 caracteres`,
      "error"
    );
  } else if (!validateEmail(editCompanyEmail.value)) {
    swal("", `Ingrese un email válido`, "error");
  } else if (editCompanyPhone.value.length < 10) {
    swal("", `Ingrese un Número de teléfono válido`, "error");
  } else if (editCompany_regionSelectID.value === "0") {
    swal("", `Seleccione una región`, "error");
  } else if (editCompany_countrySelectID.value === "0") {
    swal("", `Seleccione un país`, "error");
  } else if (editCompany_citySelectID.value === "0") {
    swal("", `Seleccione una ciudad`, "error");
  } else {
    editCompanyData(URL_GETCOMPANY, companyData, token, companyID)
      .then((response) => {
        if (response.message === "Company has been updated") {
          swal(
            "",
            `La compañía ${companyData.companyName} fue actualizada exitosamente`,
            "success"
          );
          $("#editCompanyModal").modal("hide");
          getCompanies();
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  }
};

// END EDIT COMPANY

/**
 * @method deleteCompany
 * @description: Delete company function
 * @returns {}
 */

const deleteCompany = () => {
  const { deleteCompanyData } = apiCompanies;
  const token = getTokenLocalStorage();
  const companyID = deleteCompanyID.value;
  deleteCompanyData(URL_GETCOMPANY, token, companyID)
    .then((response) => {
      if (response.message === "Company has been deleted") {
        swal("", `La compañía se ha eliminado exitosamente`, "success");
        getCompanies();
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * END CRUD COMPANIES
 */

/**
 * NEW COMPANY - FILLING REGIONS, COUNTRIES AND CITIES
 */

// FILL REGIONS SELECT - NEW COMPANY

/**
 * @method getRegions
 * @description Get regions json from the backend
 * @returns {array}
 */

const getRegions = () => {
  const { getRegionsData } = apiRegions;
  const token = getTokenLocalStorage();
  getRegionsData(URL_GETALLREGIONS, token)
    .then((response) => {
      getRegionsDataJson(response);
      //listener
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getRegionsDataJson
 * @description Get regions data from the json one by one
 * @param {array} regionsList
 * @returns {string}
 */

const getRegionsDataJson = (regionsList) => {
  allHTMLRegionsData =
    '<option selected disabled value="0">Seleccionar región</option>';
  regionsList.regions.forEach((regionItem) => {
    const { regionID, regionName } = regionItem;

    allHTMLRegionsData += htmlRegionsSelectData(regionID, regionName);
  });

  newCompany_regionSelectID.innerHTML = allHTMLRegionsData;
  //listener
  let regionSelected = newCompany_regionSelectID.value;
  getCountries(regionSelected);
  addEventListenerRegionSelected();
};

/**
 * @method htmlRegionsSelectData
 * @description Get Regions data and create options
 * @param {string} regionID
 * @param {string} regionName
 * @returns {string}
 */
const htmlRegionsSelectData = (regionID, regionName) => {
  return `
    <option value="${regionID}" data-info="countries" data-id="${regionID}" >${regionName}</option>`;
};

/**
 * @method addEventListenerRegionSelected
 * @description Update UI for show options when hover ellipsis
 * @param {object} e Event information
 * @returns {string}
 */

const addEventListenerRegionSelected = () => {
  newCompany_regionSelectID.addEventListener(
    "change",
    () => {
      let regionSelected = newCompany_regionSelectID.value;
      getCountries(regionSelected);
    },
    false
  );
};

// END FILL REGIONS SELECT - NEW COMPANY

// FILL COUNTRIES SELECT - NEW COMPANY

/**
 * @method getCountries
 * @description Get countries json from the backend
 * @param {string} regionID
 * @returns {String}
 */

const getCountries = (regionID) => {
  allHTMLCitiesData = "";
  allHTMLCountriesData = "";
  const { getCountriesByRegionData } = apiRegions;
  const token = getTokenLocalStorage();
  getCountriesByRegionData(URL_GETCOUNTRYBYREGION, token, regionID)
    .then((response) => {
      getCountriesDataJson(response);
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getCountriesDataJson
 * @description Get regions data from the json one by one - Render Countries List on the DOM
 * @returns {String}
 */

const getCountriesDataJson = (countriesList) => {
  allHTMLCountriesData =
    '<option selected  disabled value="0">Seleccionar país</option>';
  countriesList.countries.forEach((countryItem) => {
    const { countryID, regionID, countryName } = countryItem;

    allHTMLCountriesData += htmlCountriesSelectData(
      countryID,
      regionID,
      countryName
    );
  });

  newCompany_countrySelectID.innerHTML = allHTMLCountriesData;
  let countrySelected = newCompany_countrySelectID.value;
  getCities(countrySelected);
  addEventListenerCountrySelected();
};

/**
 * @method htmlCountriesSelectData
 * @description Get country data and create options
 * @param {string} countryID
 * @param {string} regionID
 * @param {string} countryName
 * @return {string}
 */

const htmlCountriesSelectData = (countryID, regionID, countryName) => {
  return `<option value="${countryID}" data-info="countries" data-id="${countryID}" data-idregion="${regionID}">${countryName}</option>`;
};

/**
 * @method addEventListenerCountrySelected
 * @description Update UI for show options when hover ellipsis
 * @param {object} e Event information
 * @returns {string}
 */

const addEventListenerCountrySelected = () => {
  newCompany_countrySelectID.addEventListener(
    "change",
    () => {
      let countrySelected = newCompany_countrySelectID.value;
      getCities(countrySelected);
    },
    false
  );
};

// END FILL COUNTRIES SELECT - NEW COMPANY

// FILL CITIES SELECT - NEW COMPANY

/**
 * @method getCities
 * @description Render Countries List on the DOM
 * @returns {String}
 */

const getCities = (countryID) => {
  allHTMLCitiesData = "";
  const { getCitiesByCountryData } = apiRegions;
  const token = getTokenLocalStorage();
  getCitiesByCountryData(URL_GETCITYBYCOUNTRY, token, countryID)
    .then((response) => {
      getCitiesDataJson(response);
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getCitiesDataJson
 * @description Get company data and create rows
 * @param {array} citiesList
 * @return {string}
 */

const getCitiesDataJson = (citiesList) => {
  allHTMLCitiesData =
    '<option selected disabled value="0">Seleccionar ciudad</option>';
  citiesList.cities.forEach((cityItem) => {
    const { cityID, countryID, cityName } = cityItem;

    allHTMLCitiesData += htmlCitiesSelectData(cityID, countryID, cityName);
  });

  newCompany_citySelectID.innerHTML = allHTMLCitiesData;
};

/**
 * @method htmlCitiesSelectData
 * @description Get company data and create rows
 * @param {string} cityID
 * @param {string} cityName
 * @return {string}
 */

const htmlCitiesSelectData = (cityID, countryID, cityName) => {
  return `<option value="${cityID}" data-info="cities" data-id="${cityID}" data-idcountry="${countryID}">${cityName}</option>`;
};

// END FILL CITIES SELECT - NEW COMPANY

/**
 * END NEW COMPANY - FILLING REGIONS, COUNTRIES AND CITIES
 */

/**
 * EDIT COMPANY - FILLING REGIONS, COUNTRIES AND CITIES -
 */

// FILL REGIONS SELECT - EDIT COMPANY

/**
 * @method getRegionsEditCompany
 * @description Render Regions List on the DOM
 * @returns {array}
 */

const getRegionsEditCompany = () => {
  const { getRegionsData } = apiRegions;
  const token = getTokenLocalStorage();
  getRegionsData(URL_GETALLREGIONS, token)
    .then((response) => {
      getRegionsDataJsonEditCompany(response);
      //listener
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getRegionsDataJsonEditCompany
 * @description Render Regions List on the DOM
 * @param {array} regionsList
 * @returns {string}
 */

const getRegionsDataJsonEditCompany = (regionsList) => {
  allHTMLRegionsDataEdit =
    '<option selected  disabled value="0">Seleccionar Región</option>';
  regionsList.regions.forEach((regionItem) => {
    const { regionID, regionName } = regionItem;

    allHTMLRegionsDataEdit += htmlRegionsSelectDataEditCompany(
      regionID,
      regionName
    );
  });

  editCompany_regionSelectID.innerHTML = allHTMLRegionsDataEdit;
  //listener
  let regionSelected = editCompany_regionSelectID.value;
  getCountriesEditCompany(regionSelected, 0);
  addEventListenerRegionSelectedEditCompany();
};

/**
 * @method htmlRegionsSelectDataEditCompany
 * @description Get Regions data and create options
 * @param {string} regionID
 * @param {string} regionName
 * @returns {string}
 */
const htmlRegionsSelectDataEditCompany = (regionID, regionName) => {
  return `<option value="${regionID}" data-info="countries" data-id="${regionID}" >${regionName}</option>`;
};

/**
 * @method addEventListenerRegionSelectedEditCompany
 * @description Update UI for show options when hover ellipsis
 * @param {object} e Event information
 * @returns {string}
 */

const addEventListenerRegionSelectedEditCompany = () => {
  editCompany_regionSelectID.addEventListener(
    "change",
    () => {
      let regionSelected = editCompany_regionSelectID.value;
      getCountriesEditCompany(regionSelected, 0);
    },
    false
  );
};

// END FILL REGIONS SELECT - EDIT COMPANY

// FILL COUNTRIES SELECT - EDIT COMPANY

/**
 * @method getCountriesEditCompany
 * @description Render Countries List on the DOM
 * @returns {String}
 */

const getCountriesEditCompany = (regionID, countryID) => {
  allHTMLCitiesDataEdit = "";
  allHTMLCountriesDataEdit = "";
  const { getCountriesByRegionData } = apiRegions;
  const token = getTokenLocalStorage();
  getCountriesByRegionData(URL_GETCOUNTRYBYREGION, token, regionID)
    .then((response) => {
      getCountriesDataJsonEditCompany(response, countryID);
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getCountriesDataJsonEditCompany
 * @description Render Countries List on the DOM
 * @returns {String}
 */

const getCountriesDataJsonEditCompany = (countriesList, countryID) => {
  allHTMLCountriesDataEdit =
    '<option selected  disabled value="0">Seleccionar país</option>';
  countriesList.countries.forEach((countryItem) => {
    const { countryID, regionID, countryName } = countryItem;

    allHTMLCountriesDataEdit += htmlCountriesSelectDataEditCompany(
      countryID,
      regionID,
      countryName
    );
  });

  editCompany_countrySelectID.innerHTML = allHTMLCountriesDataEdit;
  if (countryID > 0) {
    editCompany_countrySelectID.value = countryID;
  } else {
    let countrySelected = editCompany_countrySelectID.value;
    getCitiesEditCompany(countrySelected, 0);
  }

  addEventListenerCountrySelectedEditCompany();
};

/**
 * @method htmlCountriesSelectDataEditCompany
 * @description Get country data and create options
 * @param {string} countryID
 * @param {string} regionID
 * @param {string} countryName
 * @return {string}
 */

const htmlCountriesSelectDataEditCompany = (
  countryID,
  regionID,
  countryName
) => {
  return `<option value="${countryID}" data-info="countries" data-id="${countryID}" data-idregion="${regionID}">${countryName}</option>`;
};

/**
 * @method addEventListenerCountrySelectedEditCompany
 * @description Update UI for show options when hover ellipsis
 * @param {object} e Event information
 * @returns {string}
 */

const addEventListenerCountrySelectedEditCompany = () => {
  editCompany_countrySelectID.addEventListener(
    "change",
    () => {
      let countrySelected = editCompany_countrySelectID.value;
      getCitiesEditCompany(countrySelected, 0);
    },
    false
  );
};

// END FILL COUNTRIES SELECT - EDIT COMPANY

// FILL CITIES SELECT  - EDIT COMPANY

/**
 * @method getCitiesEditCompany
 * @description Render Countries List on the DOM
 * @returns {String}
 */

const getCitiesEditCompany = (countryID, cityID) => {
  allHTMLCitiesDataEdit = "";
  const { getCitiesByCountryData } = apiRegions;
  const token = getTokenLocalStorage();
  getCitiesByCountryData(URL_GETCITYBYCOUNTRY, token, countryID)
    .then((response) => {
      getCitiesDataJsonEditCompany(response, cityID);
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getCitiesDataJsonEditCompany
 * @description Get company data and create rows
 * @param {array} citiesList
 * @return {string}
 */

const getCitiesDataJsonEditCompany = (citiesList, cityID) => {
  allHTMLCitiesDataEdit =
    '<option selected disabled value="0">Seleccionar ciudad</option>';
  citiesList.cities.forEach((cityItem) => {
    const { cityID, countryID, cityName } = cityItem;

    allHTMLCitiesDataEdit += htmlCitiesSelectDataEditCompany(
      cityID,
      countryID,
      cityName
    );
  });

  editCompany_citySelectID.innerHTML = allHTMLCitiesDataEdit;
  if (cityID > 0) {
    editCompany_citySelectID.value = cityID;
  }
};

/**
 * @method htmlCitiesSelectDataEditCompany
 * @description Get company data and create rows
 * @param {string} cityID
 * @param {string} cityName
 * @return {string}
 */

const htmlCitiesSelectDataEditCompany = (cityID, countryID, cityName) => {
  return `<option value="${cityID}" data-info="cities" data-id="${cityID}" data-idcountry="${countryID}">${cityName}</option>`;
};

// END FILL CITIES SELECT  - EDIT COMPANY

/**
 * END EDIT COMPANY - FILLING REGIONS, COUNTRIES AND CITIES -
 */

/**
 * LISTENERS
 */

/**
 * @method addEventListenerAddCompanyBtn
 * @description: Event Listener Save Company
 * @returns {}
 */

const addEventListenerAddCompanyBtn = () => {
  addCompanyBtn.addEventListener(
    "click",
    () => {
      newCompanyName.value = "";
      newCompanyAddress.value = "";
      newCompanyEmail.value = "";
      newCompanyPhone.value = "";
    },
    false
  );
};

/**
 * @method addEventListenerSaveCompany
 * @description: Event Listener Save Company
 * @returns {}
 */

const addEventListenerSaveCompany = () => {
  saveCompanyModalBtn.addEventListener("click", createCompany);
};

/**
 * @method addEventListenerEditCompanyBtnList
 * @description: Event Listener Edit Company
 * @returns {}
 */

const addEventListenerEditCompanyBtnList = (editCompaniesList) => {
  editCompaniesList.forEach((editCompanyBtn) => {
    let companyID = editCompanyBtn.getAttribute("data-id");
    editCompanyBtn.addEventListener(
      "click",
      () => {
        loadEditCompanyData(companyID);
      },
      false
    );
  });
};

/**
 * @method addEventListenerDeleteCompanyBtnList
 * @description: Event Listener Delete Country
 * @returns {}
 */

const addEventListenerDeleteCompanyBtnList = (deleteCompanyBtnList) => {
  deleteCompanyBtnList.forEach((deleteCompany) => {
    let companyID = deleteCompany.getAttribute("data-id");
    deleteCompany.addEventListener(
      "click",
      () => {
        deleteCompanyID.value = companyID;
      },
      false
    );
  });
};

/**
 * @method addEventListenerEditCompany
 * @description: Event Listener Edit Company
 * @returns {}
 */

const addEventListenerEditCompany = () => {
  editCompanyModalBtn.addEventListener("click", editCompany);
};

/**
 * @method addEventListenerDeleteCompany
 * @description: Event Listener Delete Company
 * @returns {}
 */

const addEventListenerDeleteCompany = () => {
  deleteCompanyModalBtn.addEventListener("click", deleteCompany);
};

/**
 * END LISTENERS
 */

/**
 * @method checkUser
 * @description
 *
 */

const checkUser = () => {
  let isAdmin = getUserLocalStorage();
  if (isAdmin === "Admin") {
    navLinkUsers.classList.remove("d-none");
  }
};

/**
 * @method renderMsg
 * @description Render message on the DOM
 * @returns {String}
 */

const renderMsg = (msg) =>
  (document.querySelector(".error-msg").innerHTML = msg);

/**
 * Run
 */

checkUser();
getCompanies();
getRegions();
getRegionsEditCompany();
addEventListenerSaveCompany();
addEventListenerEditCompany();
addEventListenerDeleteCompany();
addEventListenerAddCompanyBtn();
