/**
 * Imports
 */
import api from "./main_servicesUser.js";
import {
  URL_GETALLUSERS,
  URL_REGISTER,
  URL_GETUSERID,
} from "./global_variables.js";
import {
  getTokenLocalStorage,
  getUserLocalStorage,
} from "./localstorage_controller.js";

/**
 * Global Variables
 */

let allHTMLUsersData = "";

let tableUsersData = document.getElementById("users-body-table");
let navLinkUsers = document.getElementById("navLinkUsers");

let createUserBtn = document.getElementById("createUserBtn");

let addUserBtnModal = document.getElementById("addUserBtnModal");
let newUserName = document.getElementById("newUserName");
let userLastName = document.getElementById("userLastName");
let userEmail = document.getElementById("userEmail");
let userProfile = document.getElementById("userProfile");
let newUserPassword = document.getElementById("newUserPassword");
let newUserPasswordConfirm = document.getElementById("newUserPasswordConfirm");

let editUserName = document.getElementById("editUserName");
let editUserLastName = document.getElementById("editUserLastName");
let editUserEmail = document.getElementById("editUserEmail");
let editUserProfile = document.getElementById("editUserProfile");
let editUserState = document.getElementById("editUserState");
let editUserPassword = document.getElementById("editUserPassword");
let editUserBtn = document.getElementById("editUserBtn");
let userIDDelete = document.getElementById("userIDDelete");
let deleteUserBtn = document.getElementById("deleteUserBtn");

/**
 * @method getAllUsers
 * @description
 */

const getAllUsers = () => {
  allHTMLUsersData = "";
  const token = getTokenLocalStorage();
  const { getUsersData } = api;
  getUsersData(URL_GETALLUSERS, token)
    .then((response) => {
      getUsersDataJson(response);
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method getUsersDataJson
 * @description
 */

const getUsersDataJson = (usersList) => {
  usersList.users.forEach((userItem) => {
    const {
      userID,
      userName,
      userLastName,
      userEmail,
      userProfile,
      userStatus,
    } = userItem;

    allHTMLUsersData += htmlUsersRowData(
      userID,
      userName,
      userLastName,
      userEmail,
      userProfile,
      userStatus
    );
  });

  tableUsersData.innerHTML = allHTMLUsersData;
  addEventListenerEditButton(tableUsersData.querySelectorAll(".edit"));
  addEventListenerDeleteButton(tableUsersData.querySelectorAll(".delete"));
};

/**
 * @method htmlUsersRowData
 * @description
 */

const htmlUsersRowData = (
  userID,
  userName,
  userLastName,
  userEmail,
  userProfile,
  userStatus
) => {
  return `<tr>
        <td class="align-middle pl-5">${userName}</td>
        <td class="align-middle">${userLastName}</td>
        <td class="align-middle pl-5">${userEmail}</td>
        <td class="align-middle">${userProfile}</td>
        <td class="align-middle">${userStatus}</td>
        <td class="align-middle">
            <button type="button" class="btn btn-lg text-black-50 ml-n3 delete" data-id="${userID}" data-toggle="modal" data-target="#deleteUserModal"><span style="color: #5E2129;"><i class="fa fa-trash" aria-hidden="true"></i></span></button>
            <button type="button" class="btn btn-lg text-black-50 edit" data-id="${userID}" data-toggle="modal" data-target="#editUserModal"><span style="color: #5E2129;"><i class="fa fa-pencil" aria-hidden="true"></i></span></button>
        </td>
    </tr>`;
};

/**
 * @method createUser
 * @description: Event Listener Close Modal
 * @returns {}
 */

const createUser = () => {
  const userData = {
    userName: newUserName.value,
    userLastName: userLastName.value,
    userEmail: userEmail.value,
    userProfile: userProfile.value,
    userPassword: newUserPassword.value,
    userImg: "../assets/bono.jpg",
  };
  const { registerUserData } = api;
  const token = getTokenLocalStorage();
  if (newUserName.value === "") {
    swal("", `Ingrese el nombre del Usuario`, "error");
  } else if (userLastName.value === "") {
    swal("", `Ingrese el apellido del Usuario`, "error");
  } else if (!validateEmail(userEmail.value)) {
    swal("", `Ingrese un email válido`, "error");
  } else if (userProfile.value === "0") {
    swal("", `Por favor seleccione el Perfil del Usuario`, "error");
  } else if (newUserPassword.value.length < 8) {
    swal(
      "",
      `La contraseña del Usuario debe tener mínimo 8 caracteres`,
      "error"
    );
  } else if (newUserPassword.value !== newUserPasswordConfirm.value) {
    swal("", `Las contraseñas no coinciden`, "error");
  } else {
    registerUserData(URL_REGISTER, userData, token)
      .then((response) => {
        if (response.message === "Created") {
          swal(
            "",
            `El usuario ${userData.userName} ${userData.userLastName} fue creado exitosamente`,
            "success"
          );
          $("#newUserModal").modal("hide");
          getAllUsers();
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

/**
 * @method loadUserData
 * @description: Event Listener Close Modal
 * @returns {}
 */

const loadUserData = (id) => {
  const { getUserData } = api;
  const token = getTokenLocalStorage();
  getUserData(URL_GETUSERID, token, id)
    .then((response) => {
      if (response.message === "User Found") {
        userID.value = response.user.userID;
        editUserName.value = response.user.userName;
        editUserLastName.value = response.user.userLastName;
        editUserEmail.value = response.user.userEmail;
        editUserProfile.value = response.user.userProfile;
        editUserState.value = response.user.userStatus;
        editUserPassword.value = "";
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method editUserData
 * @description: Event Listener Close Modal
 * @returns {}
 */

const editUserData = () => {
  const { editUserData } = api;
  const token = getTokenLocalStorage();
  const userID = document.getElementById("userID").value;
  const userPassword = editUserPassword.value;
  let passwordUpdated = "No Updated";
  if (userPassword.lenght > 0) {
    passwordUpdated = "Updated";
  }
  const userData = {
    userName: editUserName.value,
    userLastName: editUserLastName.value,
    userEmail: editUserEmail.value,
    userProfile: editUserProfile.value,
    userStatus: editUserState.value,
    userPassword: userPassword,
    passwordUpdated: passwordUpdated,
    userImg: "../assets/bono.jpg",
  };
  if (editUserName.value === "") {
    swal("", `Ingrese el nombre del Usuario`, "error");
  } else if (editUserLastName.value === "") {
    swal("", `Ingrese el apellido del Usuario`, "error");
  } else if (!validateEmail(editUserEmail.value)) {
    swal("", `Ingrese un email válido`, "error");
  } else if (editUserProfile.value === "0") {
    swal("", `Por favor seleccione el Perfil del Usuario`, "error");
  } else if (editUserState.value === "0") {
    swal("", `Por favor seleccione el Perfil del Usuario`, "error");
  } else {
    editUserData(URL_GETUSERID, userData, token, userID)
      .then((response) => {
        if (response.message === "Updated user") {
          swal(
            "",
            `El usuario ${userData.userName} ${userData.userLastName} fue actualizado exitosamente`,
            "success"
          );
          $("#editUserModal").modal("hide");
          getAllUsers();
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
 * @method deleteUserData
 * @description: Event Listener Close Modal
 * @returns {}
 */

const deleteUserData = () => {
  const { deleteUserData } = api;
  const token = getTokenLocalStorage();
  const userID = userIDDelete.value;
  deleteUserData(URL_GETUSERID, token, userID)
    .then((response) => {
      if (response.message === "Disabled user") {
        swal("", `El usuario ha sido desabilitado exitosamente`, "success");
        getAllUsers();
      } else {
        swal("", `${response.message}`, "error");
      }
    })
    .catch((error) => {
      renderMsg(error);
    });
};

/**
 * @method addEventListenerEditButton
 * @description: Event Listener Save User
 * @returns {}
 */

const addEventListenerEditButton = (editButtonsList) => {
  editButtonsList.forEach((editBtn) => {
    let userID = editBtn.getAttribute("data-id");
    editBtn.addEventListener(
      "click",
      () => {
        loadUserData(userID);
      },
      false
    );
  });
};

/**
 * @method addEventListenerDeleteButton
 * @description: Event Listener Save User
 * @returns {}
 */

const addEventListenerDeleteButton = (deleteButtonsList) => {
  deleteButtonsList.forEach((deleteBtn) => {
    let userID = deleteBtn.getAttribute("data-id");
    deleteBtn.addEventListener(
      "click",
      () => {
        userIDDelete.value = userID;
      },
      false
    );
  });
};

/**
 * @method addEventListenerSaveUser
 * @description: Event Listener Save User
 * @returns {}
 */

const addEventListenerSaveUser = () => {
  newUserName.value = "";
  userLastName.value = "";
  userEmail.value = "";
  userProfile.value = "";
  newUserPassword.value = "";
  newUserPasswordConfirm.value = "";
  userProfile.value = "0";
  createUserBtn.addEventListener("click", createUser);
};

/**
 * @method addEventListenerSaveUser
 * @description: Event Listener Save User
 * @returns {}
 */

const addEventListenerAddUser = () => {
  addUserBtnModal.addEventListener(
    "click",
    () => {
      newUserName.value = "";
      userLastName.value = "";
      userEmail.value = "";
      userProfile.value = "";
      newUserPassword.value = "";
      newUserPasswordConfirm.value = "";
      userProfile.value = "0";
    },
    false
  );
};

/**
 * @method addEventListenerEditUser
 * @description: Event Listener Save User
 * @returns {}
 */

const addEventListenerEditUser = () => {
  editUserBtn.addEventListener("click", editUserData);
};

/**
 * @method addEventListenerDeleteUser
 * @description: Event Listener Save User
 * @returns {}
 */

const addEventListenerDeleteUser = () => {
  deleteUserBtn.addEventListener("click", deleteUserData);
};

/**
 * @method checkUser
 * @description
 *
 */

const checkUser = () => {
  let isAdmin = getUserLocalStorage();
  if (isAdmin === "Admin") {
    navLinkUsers.classList.remove("d-none");
  } else {
    window.location.replace("../index.html");
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
getAllUsers();
addEventListenerSaveUser();
addEventListenerEditUser();
addEventListenerDeleteUser();
addEventListenerAddUser();

//https://www.javatpoint.com/oprweb/test.jsp?filename=confirm-password-validation-in-javascript3

//https://www.geeksforgeeks.org/password-matching-using-javascript/
