/**
 * Imports
 */

import apiRegions from "./main_servicesRegion.js";
import {
  URL_NEWREGION,
  URL_GETALLREGIONS,
  URL_NEWCOUNTRY,
  URL_GETCOUNTRY,
  URL_NEWCITY,
  URL_GETCITY,
} from "./global_variables.js";
import {
  getTokenLocalStorage,
  getUserLocalStorage,
} from "./localstorage_controller.js";

/**
 * Global Variables
 */

let allHTMLRegionsData = "";
let regionsTree = document.getElementById("myUL");

let navLinkUsers = document.getElementById("navLinkUsers");

let newRegionName = document.getElementById("newRegionName");
let createRegionBtn = document.getElementById("createRegionBtn");
let editRegionID = document.getElementById("editRegionID");
let editRegionName = document.getElementById("editRegionName");
let editRegionButtonSave = document.getElementById("editRegionButtonSave");
let deleteRegionID = document.getElementById("deleteRegionID");
let deleteButtonModal = document.getElementById("deleteButtonModal");

let newCountry_RegionID = document.getElementById("newCountry_RegionID");
let newCountry_RegionName = document.getElementById("newCountry_RegionName");
let newCountryName = document.getElementById("newCountryName");
let createCountryModalBtn = document.getElementById("createCountryModalBtn");
let editCountryID = document.getElementById("editCountryID");
let editCountry_RegionID = document.getElementById("editCountry_RegionID");
let editCountry_RegionName = document.getElementById("editCountry_RegionName");
let editCountryName = document.getElementById("editCountryName");
let editCountryModalBtn = document.getElementById("editCountryModalBtn");
let deleteCountryID = document.getElementById("deleteCountryID");
let deleteCountryModalBtn = document.getElementById("deleteCountryModalBtn");

let newCity_CountryID = document.getElementById("newCity_CountryID");
let newCity_CountryName = document.getElementById("newCity_CountryName");
let newCityName = document.getElementById("newCityName");
let createCityBtn = document.getElementById("createCityBtn");

let editCity_CountryID = document.getElementById("editCity_CountryID");
let editCity_CountryName = document.getElementById("editCity_CountryName");
let editCityID = document.getElementById("editCityID");
let editCityName = document.getElementById("editCityName");
let editCityBtn = document.getElementById("editCityBtn");

let deleteCityID = document.getElementById("deleteCityID");
let deleteCityModalBtn = document.getElementById("deleteCityModalBtn");

/**
 * CRUD REGIONS
 */

/**
 * @method createRegion
 * @description: Create Region Function
 * @returns {}
 */

const createRegion = (() => {
  const { createRegionData } = apiRegions;
  const token = getTokenLocalStorage();
  const regionData = {
    regionName: newRegionName.value,
  };
  if (newRegionName.value === "") {
    swal("", `Ingrese el nombre de la Región`, "error");
  } else if (newRegionName.value.length < 2 ) {
    swal("", `El nombre de la región debe tener mínimo dos caracteres`, "error");
  } else {
      createRegionData(URL_NEWREGION, regionData, token)
      .then((response) => {
        if (response.message === "Created") {
          swal(
            "",
            `La región ${regionData.regionName} fue creada exitosamente`,
            "success"
          );
          $('#newRegionModal').modal('hide');
          getRegions();
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  } 
});

/**
 * @method loadRegionData
 * @description: Load the region data in the edit modal
 * @param {string} idRegion
 * @returns {}
 */

const loadRegionData = ((idRegion) => {
  const { getRegionData } = apiRegions;
  const token = getTokenLocalStorage();
  getRegionData(URL_GETALLREGIONS, token, idRegion)
    .then((response) => {
      if (response.message === "Region Found") {
        editRegionID.value = response.region.regionID;
        editRegionName.value = response.region.regionName;
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
});

/**
 * @method editRegion
 * @description: Edit Region Function
 * @returns {}
 */

const editRegion = (() => {
  const { editRegionData } = apiRegions;
  const token = getTokenLocalStorage();
  const regionID = editRegionID.value;
  const regionData = {
    regionName: editRegionName.value,
  };
  if (editRegionName.value === "") {
    swal("", `Ingrese el nombre de la Región`, "error");
  } else if (editRegionName.value.length < 2 ) {
    swal("", `El nombre de la región debe tener mínimo dos caracteres`, "error");
  } else { 
      editRegionData(URL_GETALLREGIONS, regionData, token, regionID)
      .then((response) => {
        if (response.message === "Updated region") {
          swal(
            "",
            `La región ${regionData.regionName} fue actualizada exitosamente`,
            "success"
          );
          $('#editRegionModal').modal('hide');
          getRegions();
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  };
});

/**
 * @method deleteRegion
 * @description: Delete Region Function
 * @returns {}
 */

const deleteRegion = (() => {
  const { deleteRegionData } = apiRegions;
  const token = getTokenLocalStorage();
  const regionID = deleteRegionID.value;
  deleteRegionData(URL_GETALLREGIONS, token, regionID)
    .then((response) => {
      if (response.message === "Deleted region") {
        swal("", `La región se ha eliminado exitosamente`, "success");
        getRegions();
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
});

/**
 *  END CRUD REGIONS
 */

/**
 * CRUD COUNTRIES
 */

/**
 * @method createCountry
 * @description: Create Country Function
 * @returns {}
 */

const createCountry = (() => {
  const { createCountryData } = apiRegions;
  const token = getTokenLocalStorage();
  const countryData = {
    regionID: newCountry_RegionID.value,
    countryName: newCountryName.value,
  };
  if (newCountryName.value === "") {
    swal("", `Ingrese el nombre del País`, "error");
  } else if (newCountryName.value.length < 2 ) {
    swal("", `El nombre del País debe tener mínimo dos caracteres`, "error");
  } else { 
      createCountryData(URL_NEWCOUNTRY, countryData, token)
      .then((response) => {
        if (response.message === "Created") {
          swal(
            "",
            `El país ${countryData.countryName} fue creado exitosamente`,
            "success"
          );
          $('#newCountryModal').modal('hide');
          getRegions();
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  };  
});

/**
 * @method loadNewCountryRegionData
 * @description: Load region data into the create country modal
 *  @param {string} idRegion
 * @param {string} regionName
 * @returns {}
 */

const loadNewCountryRegionData = ((regionID, regionName) => {
  newCountryName.value = "";
  newCountry_RegionID.value = regionID;
  newCountry_RegionName.value = regionName;
});

/**
 * @method loadEditCountryData
 * @description: Load region and country data into the edit country modal
 * @param {string} idRegion
 * @param {string} regionName
 * @param {string} countryID
 * @param {string} countryName
 * @returns {}
 */

const loadEditCountryData = ((regionID, regionName, countryID, countryName) => {
  editCountryName.value = "";
  editCountry_RegionID.value = regionID;
  editCountry_RegionName.value = regionName;
  editCountryID.value = countryID;
  editCountryName.value = countryName;
});

/**
 * @method editCountry
 * @description: Edit country function
 * @returns {}
 */

const editCountry = (() => {
  const { editCountryData } = apiRegions;
  const token = getTokenLocalStorage();
  const countryID = editCountryID.value;
  const countryData = {
    regionID: editCountry_RegionID.value,
    countryName: editCountryName.value,
  };
  if (editCountryName.value === "") {
    swal("", `Ingrese el nombre del País`, "error");
  } else if (editCountryName.value.length < 2 ) {
    swal("", `El nombre del País debe tener mínimo dos caracteres`, "error");
  } else { 
      editCountryData(URL_GETCOUNTRY, countryData, token, countryID)
      .then((response) => {
        if (response.message === "Country has been updated") {
          swal(
            "",
            `El país ${countryData.countryName} fue actualizado exitosamente`,
            "success"
          );
          $('#editCountryModal').modal('hide');
          getRegions();
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  };
});

/**
 * @method deleteCountry
 * @description: Delete country function
 * @returns {}
 */

const deleteCountry = (() => {
  const { deleteCountryData } = apiRegions;
  const token = getTokenLocalStorage();
  const countryID = deleteCountryID.value;
  deleteCountryData(URL_GETCOUNTRY, token, countryID)
    .then((response) => {
      if (response.message === "Country has been deleted") {
        swal("", `El país se ha eliminado exitosamente`, "success");
        getRegions();
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
});

/**
 * END CRUD COUNTRIES
 */

/**
 * CRUD CITIES
 */

/**
 * @method createCity
 * @description: Create city function
 * @returns {}
 */

const createCity = (() => {
  const { createCityData } = apiRegions;
  const token = getTokenLocalStorage();
  const cityData = {
    countryID: newCity_CountryID.value,
    cityName: newCityName.value,
  };
  if (newCityName.value === "") {
    swal("", `Ingrese el nombre de la ciudad`, "error");
  } else if (newCityName.value.length < 2 ) {
    swal("", `El nombre de la ciudad debe tener mínimo dos caracteres`, "error");
  } else { 
      createCityData(URL_NEWCITY, cityData, token)
      .then((response) => {
        if (response.message === "Created") {
          swal(
            "",
            `La ciudad ${cityData.cityName} fue creada exitosamente`,
            "success"
          );
          $('#newCityModal').modal('hide');
          getRegions();
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  }; 
  
});

/**
 * @method loadNewCityCountryData
 * @description: Load country data into the create city modal
 * @param {string} countryID
 * @param {string} countryName
 * @returns {}
 */

const loadNewCityCountryData = ((countryID, countryName) => {
  newCityName.value = "";
  newCity_CountryID.value = countryID;
  newCity_CountryName.value = countryName;
});

/**
 * @method loadEditCityData
 * @description: Load country and city data into the edit city modal
 * @param {string} cityID
 * @param {string} cityName
 * @param {string} countryID
 * @param {string} countryName
 * @returns {}
 */

const loadEditCityData = ((cityID, cityName, countryID, countryName) => {
  editCityName.value = "";
  editCityID.value = cityID;
  editCityName.value = cityName;
  editCity_CountryID.value = countryID;
  editCity_CountryName.value = countryName;
});

/**
 * @method editCity
 * @description: Edit city function
 * @returns {}
 */

const editCity = (() => {
  const { editCityData } = apiRegions;
  const token = getTokenLocalStorage();
  const cityID = editCityID.value;
  const cityData = {
    cityName: editCityName.value,
    countryID: editCity_CountryID.value,
  };
  if (editCityName.value === "") {
    swal("", `Ingrese el nombre de la ciudad`, "error");
  } else if (editCityName.value.length < 2 ) {
    swal("", `El nombre de la ciudad debe tener mínimo dos caracteres`, "error");
  } else { 
      editCityData(URL_GETCITY, cityData, token, cityID)
      .then((response) => {
        if (response.message === "City has been updated") {
          swal(
            "",
            `La ciudad ${cityData.cityName} fue actualizada exitosamente`,
            "success"
          );
          $('#editCityModal').modal('hide');
          getRegions();
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      }); 
  };
});

/**
 * @method deleteCity
 * @description: Delete city funtion
 * @returns {}
 */

const deleteCity = (() => {
  const { deleteCityData } = apiRegions;
  const token = getTokenLocalStorage();
  const cityID = deleteCityID.value;
  deleteCityData(URL_GETCITY, token, cityID)
    .then((response) => {
      if (response.message === "City has been deleted") {
        swal("", `La ciudad se ha eliminado exitosamente`, "success");
        getRegions();
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
});

/**
 * END CRUD CITIES
 */

/**
 * CREATE DOOM TREE
 */

/**
 * @method getRegions
 * @description: Get the regions json from the backend
 * @returns {}
 */

const getRegions = (() => {
  allHTMLRegionsData = "";
  const token = getTokenLocalStorage();
  const { getRegionsData } = apiRegions;
  getRegionsData(URL_GETALLREGIONS, token)
    .then((response) => {
      getRegionsDataJson(response);
    })
    .catch((error) => {
      renderMsg(error);
    });
});

/**
 * @method getRegionsDataJson
 * @description: Get regions data from the json one by one
 * @returns {}
 */

const getRegionsDataJson = ((regionsList) => {
  regionsList.regions.forEach((regionItem) => {
    const { regionID, regionName, countries } = regionItem;
    let allHTMLCountriesData = createCountriesTreeData(
      regionID,
      regionName,
      countries
    );
    allHTMLRegionsData += htmlRegionsTreeData(
      regionID,
      regionName,
      allHTMLCountriesData
    );
  });

  regionsTree.innerHTML = allHTMLRegionsData;
  buttonsTree();
  addEventListenerEditRegionButton(regionsTree.querySelectorAll(".editRegion"));
  addEventListenerDeleteRegionButton(
    regionsTree.querySelectorAll(".deleteRegion")
  );
  addEventListenerNewCountryBtnTree(
    regionsTree.querySelectorAll(".newCountry")
  );
  addEventListenerEditCountryBtnTree(
    regionsTree.querySelectorAll(".editCountry")
  );
  addEventListenerdeleteCountryBtnTree(
    regionsTree.querySelectorAll(".deleteCountry")
  );
  addEventListenerNewCityBtnTree(regionsTree.querySelectorAll(".newCity"));
  addEventListenerEditCityBtnTree(regionsTree.querySelectorAll(".editCity"));
  addEventListenerDeleteCityBtnTree(
    regionsTree.querySelectorAll(".deleteCity")
  );
});

/**
 * @method createCountriesTreeData
 * @description: 
 * @param {string} regionID
 * @param {string} regionName
 * @param {array} countries
 * @returns {}
 */

const createCountriesTreeData = ((regionID, regionName, countries) => {
  let allHTMLCountriesData = "";
  countries.forEach((countryItem) => {
    const { countryID, countryName, Cities } = countryItem;
    let allHTMLCitiesData = createCitiesTreeData(
      countryID,
      countryName,
      Cities
    );
    allHTMLCountriesData += htmlCountriesTreeData(
      countryID,
      countryName,
      regionID,
      regionName,
      allHTMLCitiesData
    );
  });
  return allHTMLCountriesData;
});

/**
 * @method createCitiesTreeData
 * @description: Create the city tree in the DOM
 * @param {string} countryID
 * @param {string} countryName
 * @param {array} Cities
 * @returns {}
 */

const createCitiesTreeData = ((countryID, countryName, Cities) => {
  let allHTMLCitiesData = "";
  Cities.forEach((cityItem) => {
    const { cityID, cityName } = cityItem;
    allHTMLCitiesData += htmlCitiesTreeData(
      cityID,
      cityName,
      countryID,
      countryName
    );
  });
  return allHTMLCitiesData;
});

/**
 * @method htmlRegionsTreeData
 * @description:
 * @returns {}
 */

const htmlRegionsTreeData = ((regionID, regionName, htmlCountry) => {
  return `
      <li class="list-group-item"><span class="caret treeFont">${regionName}</span>
        <button type="button" class="btn btn-lg text-black-50 editRegion" data-info="regions" data-id="${regionID}" data-toggle="modal" data-target="#editRegionModal"><i class="fa fa-pencil treeColor" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-lg text-black-50 deleteRegion" data-info="regions" data-id="${regionID}" data-toggle="modal" data-target="#deleteRegionModal"><i class="fa fa-trash treeColor" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-secondary text-black btn-sm ml-3 buttonTreeAdd newCountry" data-info="countries" data-idregion="${regionID}" data-region="${regionName}" data-toggle="modal" data-target="#newCountryModal">Añadir país</button>
        <ul class="nested pl-5 list-group list-group-flush treeFont countries-Body">
            ${htmlCountry}
        </ul>
      </li>`;
});

/**
 * @method htmlCountriesTreeData
 * @description:
 * @returns {}
 */

const htmlCountriesTreeData = ((
  countryID,
  countryName,
  regionID,
  regionName,
  htmlCity
) => {
  return `
      <li><span class="caret treeFont">${countryName}</span>
        <button type="button" class="btn btn-lg text-black-50 editCountry" data-info="countries" data-id="${countryID}" data-country="${countryName}" data-idregion="${regionID}" data-region="${regionName}" data-toggle="modal" data-target="#editCountryModal"><i class="fa fa-pencil treeColor" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-lg text-black-50 deleteCountry" data-info="countries" data-id="${countryID}" data-toggle="modal" data-target="#deleteCountryModal"><i class="fa fa-trash treeColor" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-secondary text-black btn-sm ml-3 buttonTreeAdd newCity" data-info="cities" data-id="${countryID}" data-country="${countryName}" data-toggle="modal" data-target="#newCityModal">Añadir ciudad</button>
        <ul class="nested pl-5 list-group list-group-flush treeFont cities-Body">
            ${htmlCity}
        </ul>
    </li>
  `;
});

/**
 * @method htmlCitiesTreeData
 * @description:
 * @returns {}
 */

const htmlCitiesTreeData = ((cityID, cityName, countryID, countryName) => {
  return `
      <li class="caret treeFont">${cityName}
        <button type="button" class="btn btn-lg text-black-50 editCity" data-info="cities" data-id="${cityID}" data-city="${cityName}"  data-idcountry="${countryID}" data-country="${countryName}" data-toggle="modal" data-target="#editCityModal"><i class="fa fa-pencil treeColor" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-lg text-black-50 deleteCity" data-info="cities" data-id="${cityID}" data-toggle="modal" data-target="#deleteCityModal"><i class="fa fa-trash treeColor" aria-hidden="true"></i></button>
      </li>`;
});

/**
 * @method buttonsTree
 * @description Update UI for show options when hover ellipsis
 * @param {object} e Event information
 */

const buttonsTree = () => {
  let toggler = document.getElementsByClassName("caret");
  let i;

  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
};

/**
 * END CREATE DOOM TREE
 */

/**
 * LISTENERS
 */

/**
 * @method addEventListenerSaveRegion
 * @description: Event Listener Save Region
 * @returns {}
 */

const addEventListenerSaveRegion = (() => {
  createRegionBtn.addEventListener("click", createRegion);
});

/**
 * @method addEventListenerEditRegionButton
 * @description: Event Listener Save User
 * @param {array} editRegionsButtonsList List of Tree Region Edit Buttons
 * @returns {}
 */

const addEventListenerEditRegionButton = ((editRegionsButtonsList) => {
  editRegionsButtonsList.forEach((editRegionBtn) => {
    let regionID = editRegionBtn.getAttribute("data-id");
    editRegionBtn.addEventListener(
      "click",
      () => {
        loadRegionData(regionID);
      },
      false
    );
  });
});

/**
 * @method addEventListenerDeleteRegionButton
 * @description: Event Listener Save User
 * @param {array} deleteButtonsList List of Tree Region Delete Buttons
 * @returns {}
 */

const addEventListenerDeleteRegionButton = ((deleteButtonsList) => {
  deleteButtonsList.forEach((deleteBtn) => {
    let regionID = deleteBtn.getAttribute("data-id");
    deleteBtn.addEventListener(
      "click",
      () => {
        deleteRegionID.value = regionID;
      },
      false
    );
  });
});

/**
 * @method addEventListenerEditRegion
 * @description: Event Listener Save User
 * @returns {}
 */

const addEventListenerEditRegion = (() => {
  editRegionButtonSave.addEventListener("click", editRegion);
});

/**
 * @method addEventListenerDeleteRegion
 * @description: Event Listener Save User
 * @returns {}
 */

const addEventListenerDeleteRegion = (() => {
  deleteButtonModal.addEventListener("click", deleteRegion);
});

// COUNTRY LISTENERS

/**
 * @method addEventListenerNewCountryBtnTree
 * @description: Event Listener Save Country
 * @param {array} newCountryBtnList List of Tree Region new country Buttons
 * @returns {}
 */

const addEventListenerNewCountryBtnTree = ((newCountryBtnList) => {
  newCountryBtnList.forEach((newCountryBtn) => {
    let regionID = newCountryBtn.getAttribute("data-idregion");
    let regionName = newCountryBtn.getAttribute("data-region");
    newCountryBtn.addEventListener(
      "click",
      () => {
        loadNewCountryRegionData(regionID, regionName);
      },
      false
    );
  });
});

/**
 * @method addEventListenerEditCountryBtnTree
 * @description: Event Listener Edit Country
 * @param {array} editCountryBtnList List of Tree Region edit country Buttons
 * @returns {}
 */

const addEventListenerEditCountryBtnTree = ((editCountryBtnList) => {
  editCountryBtnList.forEach((editCountryBtn) => {
    let regionID = editCountryBtn.getAttribute("data-idregion");
    let regionName = editCountryBtn.getAttribute("data-region");
    let countryID = editCountryBtn.getAttribute("data-id");
    let countryName = editCountryBtn.getAttribute("data-country");
    editCountryBtn.addEventListener(
      "click",
      () => {
        loadEditCountryData(regionID, regionName, countryID, countryName);
      },
      false
    );
  });
});

/**
 * @method addEventListenerdeleteCountryBtnTree
 * @description: Event Listener Delete Country
 * @param {array} deleteCountryBtnList List of Tree Region delete country Buttons
 * @returns {}
 */

const addEventListenerdeleteCountryBtnTree = ((deleteCountryBtnList) => {
  deleteCountryBtnList.forEach((deleteCountry) => {
    let countryID = deleteCountry.getAttribute("data-id");
    deleteCountry.addEventListener(
      "click",
      () => {
        deleteCountryID.value = countryID;
      },
      false
    );
  });
});

/**
 * @method addEventListenerCreateCountry
 * @description: Event Listener Create Country
 * @returns {}
 */

const addEventListenerCreateCountry = (() => {
  createCountryModalBtn.addEventListener("click", createCountry);
});

/**
 * @method addEventListenerEditCountry
 * @description: Event Listener Edit Country
 * @returns {}
 */

const addEventListenerEditCountry = (() => {
  editCountryModalBtn.addEventListener("click", editCountry);
});

/**
 * @method addEventListenerDeleteCountry
 * @description: Event Listener Delete Country
 * @returns {}
 */

const addEventListenerDeleteCountry = (() => {
  deleteCountryModalBtn.addEventListener("click", deleteCountry);
});

// END COUNTRY LISTENERS

// CITY LISTENERS

/**
 * @method addEventListenerNewCityBtnTree
 * @description: Event Listener Save Country
 * @param {array} newCityBtnList List of Tree Region new city Buttons
 * @returns {}
 */

const addEventListenerNewCityBtnTree = ((newCityBtnList) => {
  newCityBtnList.forEach((newCityBtn) => {
    let countryID = newCityBtn.getAttribute("data-id");
    let countryName = newCityBtn.getAttribute("data-country");
    newCityBtn.addEventListener(
      "click",
      () => {
        loadNewCityCountryData(countryID, countryName);
      },
      false
    );
  });
});

/**
 * @method addEventListenerEditCityBtnTree
 * @description: Event Listener Edit City
 * @param {array} editCityBtnList List of Tree Region edit city Buttons
 * @returns {}
 */

const addEventListenerEditCityBtnTree = ((editCityBtnList) => {
  editCityBtnList.forEach((editCityBtn) => {
    let cityID = editCityBtn.getAttribute("data-id");
    let cityName = editCityBtn.getAttribute("data-city");
    let countryID = editCityBtn.getAttribute("data-idcountry");
    let countryName = editCityBtn.getAttribute("data-country");

    editCityBtn.addEventListener(
      "click",
      () => {
        loadEditCityData(cityID, cityName, countryID, countryName);
      },
      false
    );
  });
});

/**
 * @method addEventListenerDeleteCityBtnTree
 * @description: Event Listener Delete Country
 * @param {array} deleteCityBtnList List of Tree Region delete city Buttons
 * @returns {}
 */

const addEventListenerDeleteCityBtnTree = ((deleteCityBtnList) => {
  deleteCityBtnList.forEach((deleteCity) => {
    let cityID = deleteCity.getAttribute("data-id");
    deleteCity.addEventListener(
      "click",
      () => {
        deleteCityID.value = cityID;
      },
      false
    );
  });
});

/**
 * @method addEventListenerCreateCity
 * @description: Event Listener Create Country
 * @returns {}
 */

const addEventListenerCreateCity = (() => {
  createCityBtn.addEventListener("click", createCity);
});

/**
 * @method addEventListenerEditCity
 * @description: Event Listener Edit City
 * @returns {}
 */

const addEventListenerEditCity = (() => {
  editCityBtn.addEventListener("click", editCity);
});

/**
 * @method addEventListenerDeleteCity
 * @description: Event Listener Edit City
 * @returns {}
 */

const addEventListenerDeleteCity = (() => {
  deleteCityModalBtn.addEventListener("click", deleteCity);
});

// END CITY LISTENERS


/**
 * END LISTENERS
 */


/**
 * @method checkUser
 * @description 
 *
 */


 const checkUser = (() => {
  let isAdmin = getUserLocalStorage();
  if( isAdmin === "Admin" ){
    navLinkUsers.classList.remove("d-none");
  };
  
});

/**
 * @method renderMsg
 * @description Render message on the DOM
 * @returns {String}
 */

const renderMsg = ((msg) =>
  (document.querySelector(".error-msg").innerHTML = msg)); 
/**
 * Run
 */

checkUser();
getRegions();
addEventListenerSaveRegion();
addEventListenerEditRegion();
addEventListenerDeleteRegion();
addEventListenerCreateCountry();
addEventListenerEditCountry();
addEventListenerDeleteCountry();
addEventListenerCreateCity();
addEventListenerEditCity();
addEventListenerDeleteCity();
