/**
 * Imports
 */
import apiContacts from "./main_servicesContact.js";
import apiCompanies from "./main_servicesCompany.js";
import apiChanels from "./main_servicesChanel.js";
import apiRegions from "./main_servicesRegion.js";

import {
  URL_NEWCOMPANY,
  URL_GETCOMPANY,
  URL_GETALLREGIONS,
  URL_GETCOUNTRYBYREGION,
  URL_GETCITYBYCOUNTRY,
  URL_NEWCONTACT,
  URL_GETCONTACT,
  URL_FILTERCONTACT,
  URL_NEWCHANEL,
  URL_GETCHANEL,
} from "./global_variables.js";
import {
  getTokenLocalStorage,
  getUserLocalStorage,
} from "./localstorage_controller.js";

/**
 * Global Variables
 */

let allHTMLContactsData = "";

let allHTMLCompaniesData = "";
let allHTMLRegionsData = "";
let allHTMLCountriesData = "";
let allHTMLCitiesData = "";

let allHTMLCompaniesDataEdit = "";
let allHTMLRegionsDataEdit = "";
let allHTMLCountriesDataEdit = "";
let allHTMLCitiesDataEdit = "";
let allHTMLChanelsDataEdit = "";
let allHTMLAccountChanelDataEdit = "";
let allHTMLPreferencesChanelDataEdit = "";

let contactsBodyTable = document.getElementById("contactsBodyTable");

let navLinkUsers = document.getElementById("navLinkUsers");
let btnSearch = document.getElementById("btnSearch");
let searchBar = document.getElementById("searchBar");

const ascButtonsArray = document.querySelectorAll(".asc-sort");
const descButtonsArray = document.querySelectorAll(".desc-sort");

//  NEW CONTACT

let addContactBtn = document.getElementById("addContactBtn");
let newContactName = document.getElementById("newContactName");
let newContactLastname = document.getElementById("newContactLastname");
let newContactPosition = document.getElementById("newContactPosition");
let newContactEmail = document.getElementById("newContactEmail");
let newContactCompany = document.getElementById("newContactCompany");

let newContact_regionSelectID = document.getElementById(
  "newContact_regionSelectID"
);
let newContact_countrySelectID = document.getElementById(
  "newContact_countrySelectID"
);
let newContact_citySelectID = document.getElementById(
  "newContact_citySelectID"
);
let newContactAddress = document.getElementById("newContactAddress");

let newContactInterestRange = document.getElementById(
  "newContactInterestRange"
);
let newContactInterestList = document.getElementById("newContactInterestList");
let newContactInterest = document.getElementById("newContactInterest");

let newContactChannel = document.getElementById("newContactChannel");
let newContactAcount = document.getElementById("newContactAcount");
let newContactPreferences = document.getElementById("newContactPreferences");
let newContactChannelBtn = document.getElementById("newContactChannelBtn");
let contentNewChanel = document.getElementById("contentNewChanel");

let saveContactModalBtn = document.getElementById("saveContactModalBtn");

//  EDIT CONTACT

let editContactID = document.getElementById("editContactID");
let editContactName = document.getElementById("editContactName");
let editContactLastName = document.getElementById("editContactLastName");
let editContactPosition = document.getElementById("editContactPosition");
let editContactEmail = document.getElementById("editContactEmail");
let editContactCompany = document.getElementById("editContactCompany");

let editContact_regionSelectID = document.getElementById(
  "editContact_regionSelectID"
);
let editContact_countrySelectID = document.getElementById(
  "editContact_countrySelectID"
);
let editContact_citySelectID = document.getElementById(
  "editContact_citySelectID"
);
let editContactAddress = document.getElementById("editContactAddress");

let editContactInterestRange = document.getElementById(
  "editContactInterestRange"
);
let editContactInterestList = document.getElementById(
  "editContactInterestList"
);
let editContactInterestSelect = document.getElementById(
  "editContactInterestSelect"
);

let contentEditChanel = document.getElementById("contentEditChanel");
let editContactChannel = document.getElementById("editContactChannel");
let editContactAcount = document.getElementById("editContactAcount");
let editContactPreferences = document.getElementById("editContactPreferences");
let editContactNewChannelBtn = document.getElementById(
  "editContactNewChannelBtn"
);

let editContactModalBtn = document.getElementById("editContactModalBtn");

//  DELETE CONTACT

let counterSelectedCheckbox = 0;
let checkAllContacts = document.getElementById("checkAllContacts");
let numberSelectedContacts = document.getElementById("numberSelectedContacts");
let deleteSelectedContactsBtnModal = document.getElementById(
  "deleteSelectedContactsBtnModal"
);
let deleteManyContactsModal = document.getElementById(
  "deleteManyContactsModal"
);
let deleteManyContactsModalBtn = document.getElementById(
  "deleteManyContactsModalBtn"
);

let deleteContactID = document.getElementById("deleteContactID");
let deleteContactModalBtn = document.getElementById("deleteContactModalBtn");

/**
 * CONTACT'S CRUD
 */

/**
 * @method getContacts
 * @description Get the companies json from the backend
 */

const getContacts = () => {
  allHTMLContactsData = "";
  searchBar.value = "";
  const { getContactsData } = apiContacts;
  const token = getTokenLocalStorage();
  getContactsData(URL_GETCONTACT, token)
    .then((response) => {
      getContactsDataJson(response);
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getContactsDataJson
 * @description Get company data and create rows
 * @param {array} contactsList
 * @return {string}
 */

const getContactsDataJson = (contactsList) => {
  contactsList.contacts.forEach((contactItem) => {
    const {
      contactID,
      companyID,
      cityID,
      contactName,
      contactLastName,
      contactEmail,
      contactPosition,
      contactAddress,
      contactInterest,
      contactImg,
      City,
      Company,
      chanels,
    } = contactItem;

    allHTMLContactsData += htmlContacsRowData(
      contactID,
      companyID,
      cityID,
      contactName,
      contactLastName,
      contactEmail,
      contactPosition,
      contactAddress,
      contactInterest,
      contactImg,
      City,
      Company,
      chanels,
      getColor(contactInterest)
    );
  });
  contactsBodyTable.innerHTML = allHTMLContactsData;
  //listeners ADD Chanel - Edit Contact - Delete contact
  contactsBodyTable
    .querySelectorAll(".contact-row")
    .forEach((row) =>
      row.addEventListener("mouseenter", showOrHideContactOptions)
    );
  contactsBodyTable
    .querySelectorAll(".contact-row")
    .forEach((row) =>
      row.addEventListener("mouseleave", showOrHideContactOptions)
    );
  addEventListenerEditContactBtnList(
    contactsBodyTable.querySelectorAll(".editContact")
  );
  addEventListenerDeleteContactBtnList(
    contactsBodyTable.querySelectorAll(".deleteContact")
  );
  addEventListenerCheckBtnList(
    contactsBodyTable.querySelectorAll(".checkboxContact")
  );
};

/**
 * @method getColor
 * @description Get class to include color in interest bar
 * @param {number} interest
 * @return {string}
 */
const getColor = (interest) => {
  switch (interest) {
    case "0":
      return "";
    case "25":
      return "bg-primary";
    case "50":
      return "bg-warning";
    case "75":
      return "orange";
    case "100":
      return "bg-danger";
    default:
      break;
  }
};

/**
 * @method htmlContacsRowData
 * @description Create companies html rows
 * @return {string}
 */

const htmlContacsRowData = (
  contactID,
  companyID,
  cityID,
  contactName,
  contactLastName,
  contactEmail,
  contactPosition,
  contactAddress,
  contactInterest,
  contactImg,
  City,
  Company,
  chanels,
  interestColor
) => {
  return `<tr class="contact-row">
        <td class="align-middle"><input class="ml-3 checkboxContact" type="checkbox" name="user-info" data-id="${contactID}"></td>
        <td class="align-middle">
            <div class="d-flex flex-row align-items-center">
                <img src="./assets/user_avatar.png" alt="user pic" class="user-img rounded-circle">
                <div class="ml-2">
                    <p>${contactName} ${contactLastName}</p>
                    <p class="email-table text-black-50">${contactEmail}</p>
                </div>
            </div>

        </td>
        <td class="align-middle">
            <p>${City.country.countryName}</p>
            <p class="region-table text-black-50">${City.country.region.regionName}</p>
        </td>
        <td class="align-middle">${Company.companyName}</td>
        <td class="align-middle">${contactPosition}</td>
        <td class="align-middle">
            <div class="div-interest d-inline-flex align-items-center">
                <p class="interest-percentage">${contactInterest}%</p>
                <div class="progress ml-3">
                    <div class="progress-bar w-${contactInterest} ${interestColor}" role="progressbar" aria-valuenow="${contactInterest}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </td>
        <td class="align-middle text-center">
        <button type="button" class="btn text-black-50 ellipsis"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></button>
            <button type="button" class="btn btn-lg text-black-50 d-none deleteContact"  data-id="${contactID}" data-toggle="modal" data-target="#deleteContactModal"><span style="color: #5E2129;"><i class="fa fa-trash" aria-hidden="true"></i></span></button>
            <button type="button" class="btn btn-lg text-black-50 d-none editContact"  data-id="${contactID}" data-toggle="modal" data-target="#editContactModal"><span style="color: #5E2129;"><i class="fa fa-pencil" aria-hidden="true"></i></span></button>
        </td>
    </tr>`;
};

/**
 * @method showOrHideContactOptions
 * @description Change UI method to show edit and delete buttons when contact hover
 * @param {object} e Event Information
 */

const showOrHideContactOptions = (e) => {
  e.currentTarget.querySelector(".ellipsis").classList.toggle("d-none");
  e.currentTarget.querySelector(".deleteContact").classList.toggle("d-none");
  e.currentTarget.querySelector(".editContact").classList.toggle("d-none");
};

// NEW CONTACT

/**
 * @method createContact
 * @description Create Contact
 * @return {string}
 */

const createContact = () => {
  const { createContactData } = apiContacts;
  const token = getTokenLocalStorage();
  const citySelected = newContact_citySelectID.value;
  const companySelected = newContactCompany.value;

  const contactData = {
    companyID: companySelected,
    cityID: citySelected,
    contactName: newContactName.value,
    contactLastName: newContactLastname.value,
    contactEmail: newContactEmail.value,
    contactPosition: newContactPosition.value,
    contactAddress: newContactAddress.value,
    contactInterest: newContactInterest.value,
    contactImg: "../assets/bono.jpg",
  };
  if (newContactName.value === "" || newContactName.value.length < 2) {
    swal(
      "",
      `El nombre del contacto debe tener mínimo dos caracteres`,
      "error"
    );
  } else if (
    newContactLastname.value === "" ||
    newContactLastname.value.length < 2
  ) {
    swal(
      "",
      `El apellido del contacto debe tener mínimo dos caracteres`,
      "error"
    );
  } else if (
    newContactPosition.value === "" ||
    newContactPosition.value.length < 2
  ) {
    swal("", `El cargo del contacto debe tener mínimo dos caracteres`, "error");
  } else if (!validateEmail(newContactEmail.value)) {
    swal("", `Ingrese un email válido`, "error");
  } else if (newContactCompany.value === "") {
    swal("", `Seleccione una Compañía`, "error");
  } else if (newContact_regionSelectID.value === "0") {
    swal("", `Seleccione una región`, "error");
  } else if (newContact_countrySelectID.value === "0") {
    swal("", `Seleccione un país`, "error");
  } else if (newContact_citySelectID.value === "0") {
    swal("", `Seleccione una ciudad`, "error");
  } else if (
    newContactAddress.value === "" ||
    newContactAddress.value.length < 10
  ) {
    swal(
      "",
      `La dirección del contacto debe tener mínimo 10 caracteres`,
      "error"
    );
  } else {
    createContactData(URL_NEWCONTACT, contactData, token)
      .then((response) => {
        if (response.message === "Created") {
          //llamar la creación de canales
          createChanel(response.contact.contactID);
          swal(
            "",
            `El Contacto ${contactData.contactName} ${contactData.contactLastName} fue creado exitosamente`,
            "success"
          );
          $("#newContactModal").modal("hide");
          getContacts();
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

/**
 * @method updateSelect
 * @description Update interest select value
 */

const updateSelect = () => {
  const newValue = newContactInterestRange.value;
  newContactInterest.value = newValue;
};

/**
 * @method updateRange
 * @description Update interest bar range value
 */

const updateRange = () => {
  const newValue = newContactInterest.value;
  newContactInterestRange.value = newValue;
};

// END NEW CONTACT

// EDIT CONTACT

/**
 * @method loadEditContactData
 * @description Render Contact Data on edit Modal window
 * @param {number} contactID
 * @returns {string}
 */

const loadEditContactData = (contactID) => {
  const { getContactData } = apiContacts;
  const token = getTokenLocalStorage();
  getContactData(URL_GETCONTACT, token, contactID)
    .then((response) => {
      if (response.message === "Contact Found") {
        editContactID.value = response.contact.contactID;
        editContactName.value = response.contact.contactName;
        editContactLastName.value = response.contact.contactLastName;
        editContactPosition.value = response.contact.contactPosition;
        editContactEmail.value = response.contact.contactEmail;
        editContactCompany.value = response.contact.companyID;
        editContactAddress.value = response.contact.contactAddress;
        editContactInterestSelect.value = response.contact.contactInterest;
        editContactInterestRange.value = editContactInterestSelect.value;

        editContact_regionSelectID.value =
          response.contact.City.country.region.regionID;

        getCountriesEditCompany(
          editContact_regionSelectID.value,
          response.contact.City.country.countryID
        );

        getCitiesEditCompany(
          response.contact.City.country.countryID,
          response.contact.cityID
        );

        loadEditChanels(response.contact.chanels);
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method loadEditChanels
 * @description:
 * @returns {}
 */

const loadEditChanels = (chanels) => {
  contentEditChanel.innerHTML = "";
  chanels.forEach((chanel) => {
    contentEditChanel.innerHTML += htmlNewChanel(
      chanel.contactChanel,
      chanel.contactAccount,
      chanel.contactPreferences,
      "false"
    );
  });
};

/**
 * @method addEvenListenerEditContactNewChanel
 * @description
 * @returns
 */

const addEvenListenerEditContactNewChanel = () => {
  editContactNewChannelBtn.addEventListener(
    "click",
    () => {
      editContactAddChanel();
    },
    false
  );
};

/**
 * @method editContactAddChanel
 * @description
 * @returns
 */

const editContactAddChanel = () => {
  const contactChannel = editContactChannel.value;
  const contactAccount = editContactAcount.value;
  const contactPreferences = editContactPreferences.value;
  if (contactChannel === "Seleccionar canal") {
    swal("", `Ingrese el canal de contacto`, "error");
  } else if (contactAccount === "") {
    swal("", `Ingrese la Cuenta de usuario`, "error");
  } else if (contactPreferences === "Seleccione una preferencia") {
    swal("", `Ingrese la preferencia`, "error");
  } else {
    contentEditChanel.innerHTML += htmlNewChanel(
      contactChannel,
      contactAccount,
      contactPreferences,
      "true"
    );
    editContactChannel.value = "Seleccionar canal";
    editContactAcount.value = "";
    editContactPreferences.value = "Seleccione una preferencia";
  }
};

/**
 * @method createChanelEditContact
 * @description
 * @returns
 */

const createChanelEditContact = (contactID) => {
  const { createChanelData } = apiChanels;
  const token = getTokenLocalStorage();
  const allNewContactDivs =
    contentEditChanel.querySelectorAll(".divNewChanels");
  allNewContactDivs.forEach((everyDiv) => {
    let isNew = everyDiv
      .querySelector(".inputNewChanel")
      .getAttribute("data-newchanel");
    if (isNew === "true") {
      let chanelData = {
        contactID: contactID,
        contactChanel: everyDiv.querySelector(".inputNewChanel").value,
        contactAccount: everyDiv.querySelector(".inputNewAccount").value,
        contactPreferences: everyDiv.querySelector(".inputNewPreferences")
          .value,
      };
      createChanelData(URL_NEWCHANEL, chanelData, token)
        .then((response) => {
          if (response.message === "Created") {
          } else {
            swal("", `${response.message}`, "error");
          }
        })
        .catch((error) => {
          renderMsg(error);
        });
    }
  });
};

/**
 * @method editContact
 * @description: Delete contact function
 * @returns {}
 */

const editContact = () => {
  const { editContactData } = apiContacts;
  let contactID = editContactID.value;
  const token = getTokenLocalStorage();
  const contactData = {
    companyID: editContactCompany.value,
    cityID: editContact_citySelectID.value,
    contactName: editContactName.value,
    contactLastName: editContactLastName.value,
    contactEmail: editContactEmail.value,
    contactPosition: editContactPosition.value,
    contactAddress: editContactAddress.value,
    contactInterest: editContactInterestSelect.value,
    contactImg: "../assets/bono.jpg",
  };
  if (editContactName.value === "" || editContactName.value.length < 2) {
    swal(
      "",
      `El nombre del contacto debe tener mínimo dos caracteres`,
      "error"
    );
  } else if (
    editContactLastName.value === "" ||
    editContactLastName.value.length < 2
  ) {
    swal(
      "",
      `El apellido del contacto debe tener mínimo dos caracteres`,
      "error"
    );
  } else if (
    editContactPosition.value === "" ||
    editContactPosition.value.length < 2
  ) {
    swal("", `El cargo del contacto debe tener mínimo dos caracteres`, "error");
  } else if (!validateEmail(editContactEmail.value)) {
    swal("", `Ingrese un email válido`, "error");
  } else if (editContactCompany.value === "0") {
    swal("", `Seleccione una Compañía`, "error");
  } else if (editContact_regionSelectID.value === "0") {
    swal("", `Seleccione una región`, "error");
  } else if (editContact_countrySelectID.value === "0") {
    swal("", `Seleccione un país`, "error");
  } else if (editContact_citySelectID.value === "0") {
    swal("", `Seleccione una ciudad`, "error");
  } else if (
    editContactAddress.value === "" ||
    editContactAddress.value.length < 10
  ) {
    swal(
      "",
      `La dirección del contacto debe tener mínimo 10 caracteres`,
      "error"
    );
  } else {
    editContactData(URL_GETCONTACT, contactData, token, contactID)
      .then((response) => {
        if (response.message === "Contact updated") {
          createChanelEditContact(contactID);
          swal(
            "",
            `El Contacto ${contactData.contactName} ${contactData.contactLastName} fue actualizado exitosamente`,
            "success"
          );
          $("#editContactModal").modal("hide");
          getContacts();
        } else {
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  }
};

/**
 * @method updateSelectEditContact
 * @description Update interest select value
 */

const updateSelectEditContact = () => {
  const newValue = editContactInterestRange.value;
  editContactInterestSelect.value = newValue;
};

/**
 * @method updateRangeEditContact
 * @description Update interest bar range value
 */

const updateRangeEditContact = () => {
  const newValue = editContactInterestSelect.value;
  editContactInterestRange.value = newValue;
};

// END EDIT CONTACT

// DELETE CONTACTS

/**
 * @method deleteContact
 * @description: Delete Contact function
 * @returns {}
 */

const deleteContact = (contactID, showMessage) => {
  const { deleteContactData } = apiContacts;
  const token = getTokenLocalStorage();

  deleteContactData(URL_GETCONTACT, token, contactID)
    .then((response) => {
      if (response.message === "Contact deleted") {
        if (showMessage) {
          swal("", `El Contacto se ha eliminado exitosamente`, "success");
          getContacts();
        }
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method checkDeleteContacts
 * @description: Delete Contact function
 * @returns {}
 */

const checkDeleteContacts = (e) => {
  updateCounter(e.currentTarget);
  toggleCounterAndDeleteContacsBtn();
  e.currentTarget.parentNode.parentNode.classList.toggle("selected-row");
};

/**
 * @method updateCounter
 * @description: Delete Contact function
 * @returns {}
 */

const updateCounter = (checkbox) => {
  if (checkbox.checked) {
    counterSelectedCheckbox++;
  } else {
    counterSelectedCheckbox--;
  }
};

/**
 * @method toggleCounterAndDeleteContacsBtn
 * @description:
 * @returns {}
 */

const toggleCounterAndDeleteContacsBtn = () => {
  if (counterSelectedCheckbox > 1) {
    numberSelectedContacts.classList.remove("d-none");
    numberSelectedContacts.innerHTML = `${counterSelectedCheckbox} seleccionados`;
    deleteSelectedContactsBtnModal.classList.remove("d-none");
  } else {
    numberSelectedContacts.classList.add("d-none");
    deleteSelectedContactsBtnModal.classList.add("d-none");
  }
};

/**
 * @method deleteManyContacts
 * @description: Delete Contact checkbox
 * @returns {}
 */

const deleteManyContacts = () => {
  let counter = 0;
  let checkboxList = contactsBodyTable.querySelectorAll(
    ".checkboxContact:checked"
  );
  checkboxList.forEach((checkbox) => {
    counter++;
    let contactID = checkbox.getAttribute("data-id");
    if (counter == checkboxList.length) {
      deleteContact(contactID, true);
    } else {
      deleteContact(contactID, false);
    }
    checkbox.checked = false;
    updateCounter(checkbox);
    toggleCounterAndDeleteContacsBtn();
  });
};

/**
 * @method checkedAllContacts
 * @description: Delete Contact checkbox
 * @returns {}
 */

const checkedAllContacts = () => {
  counterSelectedCheckbox = 0;
  let checkboxList = contactsBodyTable.querySelectorAll(".checkboxContact");
  checkboxList.forEach((checkbox) => {
    checkbox.checked = checkAllContacts.checked;
    updateCounter(checkbox);
    toggleCounterAndDeleteContacsBtn();
    if (checkbox.checked) {
      checkbox.parentNode.parentNode.classList.add("selected-row");
    } else {
      checkbox.parentNode.parentNode.classList.remove("selected-row");
    }
  });
};

/**
 * @method addEventListenerCheckBtnList
 * @description: Delete Contact checkbox
 * @returns {}
 */

const addEventListenerCheckBtnList = (checkboxList) => {
  checkboxList.forEach((checkboxBtn) => {
    checkboxBtn.addEventListener("click", checkDeleteContacts);
  });
};

// END DELETE CONTACTS

/**
 * END CONTACT'S CRUD
 */

/**
 * ADD CHANEL
 */

/**
 * @method createChanel
 * @description
 * @returns
 */

const createChanel = (contactID) => {
  const { createChanelData } = apiChanels;
  const token = getTokenLocalStorage();
  const allNewContactDivs = contentNewChanel.querySelectorAll(".divNewChanels");
  allNewContactDivs.forEach((everyDiv) => {
    let chanelData = {
      contactID: contactID,
      contactChanel: everyDiv.querySelector(".inputNewChanel").value,
      contactAccount: everyDiv.querySelector(".inputNewAccount").value,
      contactPreferences: everyDiv.querySelector(".inputNewPreferences").value,
    };
    createChanelData(URL_NEWCHANEL, chanelData, token)
      .then((response) => {
        if (response.message === "Created") {
        } else {
          swal("", `${response.message}`, "error");
        }
      })
      .catch((error) => {
        renderMsg(error);
      });
  });
};

/**
 * @method addChanel
 * @description
 * @returns
 */

const addChanel = () => {
  const contactChannel = newContactChannel.value;
  const contactAcount = newContactAcount.value;
  const contactPreferences = newContactPreferences.value;
  if (contactChannel === "Seleccionar canal") {
    swal("", `Ingrese el canal de contacto`, "error");
  } else if (contactAcount === "") {
    swal("", `Ingrese la Cuenta de usuario`, "error");
  } else if (contactPreferences === "Seleccione una preferencia") {
    swal("", `Ingrese la preferencia`, "error");
  } else {
    contentNewChanel.innerHTML += htmlNewChanel(
      contactChannel,
      contactAcount,
      contactPreferences,
      "true"
    );
    newContactChannel.value = "Seleccionar canal";
    newContactAcount.value = "";
    newContactPreferences.value = "Seleccione una preferencia";
  }
};

const htmlNewChanel = (
  contactChannel,
  contactAcount,
  contactPreferences,
  isNewChanel
) => {
  return `
    <div class="form-group form-row contact-channel-info divNewChanels">
      <div class="col">
          <label for="newContactChannel" class="col-form-label col-form-label-sm">Canal de contacto</label>
          <input type="text" class="form-control form-control-sm inputNewChanel" value="${contactChannel}" data-newchanel="${isNewChanel}" disabled>
      </div>
      <div class="col">
          <label for="newContactAcount" class="col-form-label col-form-label-sm">Cuenta de usuario</label>
          <input type="text" class="form-control form-control-sm inputNewAccount" value="${contactAcount}"  disabled>
      </div>
      <div class="col">
          <label for="newContactPreferences" class="col-form-label col-form-label-sm">Preferencias</label>
          <input type="text" class="form-control form-control-sm inputNewPreferences" value="${contactPreferences}" disabled>
      </div>
    </div>`;
};

/**
 * @method addEvenListenerNewChanel
 * @description Get companies json from the backend
 * @returns {array}
 */

const addEvenListenerNewChanel = () => {
  newContactChannelBtn.addEventListener(
    "click",
    () => {
      addChanel();
    },
    false
  );
};

/**
 * END ADD CHANEL
 */

/**
 * NEW CONTACT - FILLING COMPANIES
 */

// FILL COMPANIES SELECT - NEW CONTACT

/**
 * @method getCompanies
 * @description Get companies json from the backend
 * @returns {array}
 */

const getCompanies = () => {
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
 * @description Get companies data from the json one by one
 * @param {array} companiesList
 * @returns {string}
 */

const getCompaniesDataJson = (companiesList) => {
  allHTMLCompaniesData =
    '<option selected disabled value="0">Seleccionar Compañía</option>';
  companiesList.companies.forEach((companyItem) => {
    const { companyID, companyName } = companyItem;
    allHTMLCompaniesData += htmlCompanySelectData(companyID, companyName);
  });

  newContactCompany.innerHTML = allHTMLCompaniesData;
};

/**
 * @method htmlCompanySelectData
 * @description Get Regions data and create options
 * @param {string} companyID
 * @param {string} companyName
 * @returns {string}
 */
const htmlCompanySelectData = (companyID, companyName) => {
  return `
    <option value="${companyID}" data-info="companies" data-id="${companyID}" >${companyName}</option>`;
};

// END FILL COMPANIES SELECT - NEW CONTACT

/**
 * END NEW CONTACT - FILLING COMPANIES
 */

/**
 * EDIT CONTACT - FILLING COMPANIES
 */

// FILL COMPANIES SELECT - EDIT CONTACT

/**
 * @method getCompaniesEditContact
 * @description Render Companies List on the DOM
 * @returns {array}
 */

const getCompaniesEditContact = () => {
  const { getCompaniesData } = apiCompanies;
  const token = getTokenLocalStorage();
  getCompaniesData(URL_GETCOMPANY, token)
    .then((response) => {
      getCompaniesDataJsonEditContact(response);
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getCompaniesDataJsonEditContact
 * @description Render Companies List on the DOM
 * @param {array} companiesList
 * @returns {string}
 */

const getCompaniesDataJsonEditContact = (companiesList) => {
  allHTMLCompaniesDataEdit =
    '<option selected disabled value="0">Seleccionar Compañía</option>';
  companiesList.companies.forEach((companyItem) => {
    const { companyID, companyName } = companyItem;
    allHTMLCompaniesDataEdit += htmlCompanySelectDataEditContact(
      companyID,
      companyName
    );
  });

  editContactCompany.innerHTML = allHTMLCompaniesDataEdit;
};

/**
 * @method htmlCompanySelectDataEditContact
 * @description Get Companies data and create options
 * @param {string} companyID
 * @param {string} companyName
 * @returns {string}
 */
const htmlCompanySelectDataEditContact = (companyID, companyName) => {
  return `
    <option value="${companyID}" data-info="companies" data-id="${companyID}" >${companyName}</option>`;
};

// FILL COMPANIES SELECT - EDIT CONTACT

/**
 *  END EDIT CONTACT - FILLING COMPANIES
 */

/**
 * NEW CONTACT - FILLING REGIONS, COUNTRIES AND CITIES
 */

// FILL REGIONS SELECT - NEW CONTACT

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

  newContact_regionSelectID.innerHTML = allHTMLRegionsData;
  //listener
  let regionSelected = newContact_regionSelectID.value;
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
  newContact_regionSelectID.addEventListener(
    "change",
    () => {
      let regionSelected = newContact_regionSelectID.value;
      getCountries(regionSelected);
    },
    false
  );
};

// END FILL REGIONS SELECT - NEW CONTACT

// FILL COUNTRIES SELECT - NEW CONTACT

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

  newContact_countrySelectID.innerHTML = allHTMLCountriesData;
  let countrySelected = newContact_countrySelectID.value;
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
  newContact_countrySelectID.addEventListener(
    "change",
    () => {
      let countrySelected = newContact_countrySelectID.value;
      getCities(countrySelected);
    },
    false
  );
};

// END FILL COUNTRIES SELECT - NEW CONTACT

// FILL CITIES SELECT - NEW CONTACT

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

  newContact_citySelectID.innerHTML = allHTMLCitiesData;
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

// END FILL CITIES SELECT - NEW CONTACT

/**
 * END NEW CONTACT - FILLING REGIONS, COUNTRIES AND CITIES
 */

/**
 * EDIT CONTACT - FILLING REGIONS, COUNTRIES AND CITIES -
 */

// FILL REGIONS SELECT - EDIT CONTACT

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

  editContact_regionSelectID.innerHTML = allHTMLRegionsDataEdit;
  //listener
  let regionSelected = editContact_regionSelectID.value;
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
  editContact_regionSelectID.addEventListener(
    "change",
    () => {
      let regionSelected = editContact_regionSelectID.value;
      getCountriesEditCompany(regionSelected, 0);
    },
    false
  );
};

// END FILL REGIONS SELECT - EDIT CONTACT

// FILL COUNTRIES SELECT - EDIT CONTACT

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

  editContact_countrySelectID.innerHTML = allHTMLCountriesDataEdit;
  if (countryID > 0) {
    editContact_countrySelectID.value = countryID;
  } else {
    let countrySelected = editContact_countrySelectID.value;
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
  editContact_countrySelectID.addEventListener(
    "change",
    () => {
      let countrySelected = editContact_countrySelectID.value;
      getCitiesEditCompany(countrySelected, 0);
    },
    false
  );
};

// END FILL COUNTRIES SELECT - EDIT CONTACT

// FILL CITIES SELECT  - EDIT CONTACT

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
 * @description Get contact data and create rows
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

  editContact_citySelectID.innerHTML = allHTMLCitiesDataEdit;
  if (cityID > 0) {
    editContact_citySelectID.value = cityID;
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

// END FILL CITIES SELECT  - EDIT CONTACT

/**
 * END EDIT CONTACT - FILLING REGIONS, COUNTRIES AND CITIES -
 */

/**
 * FILTER
 */

/**
 * @method filterContact
 * @description: Event Listener Save Company
 * @returns {}
 */

const filterContact = () => {
  allHTMLContactsData = "";
  const { filterContactData } = apiContacts;
  const token = getTokenLocalStorage();
  const dataFilter = {
    searchString: searchBar.value,
  };

  filterContactData(URL_FILTERCONTACT, dataFilter, token)
    .then((response) => {
      if (response.message === "Contact Found") {
        getContactsDataJson(response);
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method addEventListenerSearchBtn
 * @description: Event Listener Save Company
 * @returns {}
 */
const addEventListenerSearchBtn = () => {
  btnSearch.addEventListener("click", filterContact);
};

/**
 * END FILTER
 */

/**
 * ORDER BY
 */

/**
 * @method ascSort
 * @description Method to get contacts in ascendent order
 * @param {object} e event information
 */
function ascSort(e) {
  const direction = e.currentTarget.getAttribute("data-direction");
  const field = e.currentTarget.getAttribute("data-field");
  const index = Number(e.currentTarget.getAttribute("data-index"));
  ascButtonsArray[index].classList.add("d-none");
  descButtonsArray[index].classList.remove("d-none");
  sortRequest(field, direction);
}

/**
 * @method descSort
 * @description Method to get contacts in descendent order
 * @param {object} e event information
 */
function descSort(e) {
  const direction = e.currentTarget.getAttribute("data-direction");
  const field = e.currentTarget.getAttribute("data-field");
  const index = Number(e.currentTarget.getAttribute("data-index"));
  descButtonsArray[index].classList.add("d-none");
  ascButtonsArray[index].classList.remove("d-none");
  sortRequest(field, direction);
}

/**
 * @method sortRequest
 * @description Method to request contacts
 * @param {sort} sort
 * @param {sort} field
 */
function sortRequest(orderBy, orderByDirection) {
  allHTMLContactsData = "";
  searchBar.value = "";
  const { getContactsData } = apiContacts;
  const token = getTokenLocalStorage();
  getContactsData(URL_GETCONTACT, token, orderBy, orderByDirection)
    .then((response) => {
      getContactsDataJson(response);
    })
    .catch((error) => {
      renderMsg(error);
    });
}

ascButtonsArray.forEach((button) => button.addEventListener("click", ascSort));
descButtonsArray.forEach((button) =>
  button.addEventListener("click", descSort)
);

/**
 * END ORDER BY
 */

/**
 * LISTENERS
 */

/**
 * @method addEventListenerSaveContact
 * @description: Event Listener Save Company
 * @returns {}
 */

const addEventListenerSaveContact = () => {
  saveContactModalBtn.addEventListener("click", createContact);
};

const addEventListenerAddContactBtn = () => {
  addContactBtn.addEventListener(
    "click",
    () => {
      newContactName.value = "";
      newContactLastname.value = "";
      newContactPosition.value = "";
      newContactEmail.value = "";
      newContactCompany.value = "";
      newContactAddress.value = "";
      newContactAcount.value = "";
    },
    false
  );
};

/**
 * @method addEventListenerEditContactBtnList
 * @description: Event Listener Edit Contact
 * @returns {}
 */

const addEventListenerEditContactBtnList = (editContactBtnList) => {
  editContactBtnList.forEach((editContactBtn) => {
    let contactID = editContactBtn.getAttribute("data-id");
    editContactBtn.addEventListener(
      "click",
      () => {
        loadEditContactData(contactID);
      },
      false
    );
  });
};

/**
 * @method addEventListenerDeleteContactBtnList
 * @description: Event Listener Delete Country
 * @returns {}
 */

const addEventListenerDeleteContactBtnList = (deleteContactBtnList) => {
  deleteContactBtnList.forEach((deleteContact) => {
    let contactID = deleteContact.getAttribute("data-id");
    deleteContact.addEventListener(
      "click",
      () => {
        deleteContactID.value = contactID;
      },
      false
    );
  });
};

/**
 * @method addEventListenerUpdateContact
 * @description: Event Listener Delete Company
 * @returns {}
 */

const addEventListenerUpdateContact = () => {
  editContactModalBtn.addEventListener("click", editContact);
};

/**
 * @method addEventListenerDeleteContact
 * @description: Event Listener Delete Company
 * @returns {}
 */

const addEventListenerDeleteContact = () => {
  deleteContactModalBtn.addEventListener(
    "click",
    () => {
      let contactID = deleteContactID.value;
      deleteContact(contactID, true);
    },
    false
  );
};

/**
 * @method addEventListenerCheckAllContacts
 * @description: Event Listener Delete Contacts
 * @returns {}
 */

const addEventListenerCheckAllContacts = () => {
  checkAllContacts.addEventListener("click", checkedAllContacts);
};

/**
 * @method addEventListenerDeleteManyContacts
 * @description: Event Listener Delete Contacts
 * @returns {}
 */

const addEventListenerDeleteManyContacts = () => {
  deleteManyContactsModalBtn.addEventListener("click", deleteManyContacts);
};

/**
 * @method addEventListenerInterestRange
 * @description: Event Listener Delete Contacts
 * @returns {}
 */

const addEventListenerInterestRange = () => {
  newContactInterestRange.addEventListener("mousemove", updateSelect);
};

/**
 * @method addEventListenerInterestSelect
 * @description: Event Listener Delete Contacts
 * @returns {}
 */

const addEventListenerInterestSelect = () => {
  newContactInterest.addEventListener("change", updateRange);
};

/**
 * @method addEventListenerInterestRangeEditContact
 * @description: Event Listener Delete Contacts
 * @returns {}
 */

const addEventListenerInterestRangeEditContact = () => {
  editContactInterestRange.addEventListener(
    "mousemove",
    updateSelectEditContact
  );
};

/**
 * @method addEventListenerInterestSelectEditContact
 * @description: Event Listener Delete Contacts
 * @returns {}
 */

const addEventListenerInterestSelectEditContact = () => {
  editContactInterestSelect.addEventListener("change", updateRangeEditContact);
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
getContacts();
getRegions();
getCompanies();
getRegionsEditCompany();
getCompaniesEditContact();
addEventListenerAddContactBtn();
addEventListenerDeleteContact();
addEvenListenerNewChanel();
addEventListenerSaveContact();
addEvenListenerEditContactNewChanel();
addEventListenerUpdateContact();
addEventListenerDeleteManyContacts();
addEventListenerCheckAllContacts();
addEventListenerSearchBtn();
addEventListenerInterestRange();
addEventListenerInterestSelect();
addEventListenerInterestRangeEditContact();
addEventListenerInterestSelectEditContact();
