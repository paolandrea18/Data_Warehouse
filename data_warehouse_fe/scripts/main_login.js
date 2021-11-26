/**
 * Imports
 */
import api from "./main_servicesUser.js";
import {
  URL_LOGIN,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
} from "./global_variables.js";
import {
  saveTokenLocalStorage,
  saveUserLocalStorage,
} from "./localstorage_controller.js";

/**
 * Variables
 */

const btnSubmit = document.getElementById("submit");
const inputEmail = document.getElementById("login");
const inputPassword = document.getElementById("password");
const labelError = document.getElementById("labelError");

let data = {};

/**
 * @method loginHandler
 * @description
 */

const loginHandler = () => {
  data = {
    userAccount: inputEmail.value,
    password: inputPassword.value,
  };
  api
    .loginUserData(URL_LOGIN, data)
    .then((response) => {
      if (response.message === "") {
        getDataLogin(response.user, response.token);
        window.location.replace("../index.html");
      } else {
        showErrorMessage();
      }
    })
    .catch((error) => {
      console.log("Status: %d\n\n", res.statusCode, error);
    });
};

/**
 * @method getDataLogin
 * @description
 */

const getDataLogin = (user, token) => {
  saveTokenLocalStorage(token);
  saveUserLocalStorage(user);
};

/**
 * @method hiddenErrorMessage
 * @description: hide the view more button
 * @returns {}
 */

const showErrorMessage = () => {
  labelError.classList.remove("hidden");
  labelError.classList.add("loginError");
};

/**
 * Listener
 */
btnSubmit.addEventListener("click", loginHandler);
