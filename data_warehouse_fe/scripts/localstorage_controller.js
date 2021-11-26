/**
 * Imports
 */

 import {LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER} from './global_variables.js';

/**
 * @method saveTokenLocalStorage
 * @description 
 * @param {} 
 */

const saveTokenLocalStorage = ((token) => {
    
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    

});


/**
 * @method getTokenLocalStorage
 * @description 
 * @param {} 
 */

 const getTokenLocalStorage = (() => {
     
     return localStorage.getItem(LOCAL_STORAGE_TOKEN);
    

});


/**
 * @method saveUserLocalStorage
 * @description 
 * @param {} 
 */

 const saveUserLocalStorage = ((user) => {
    
    localStorage.setItem(LOCAL_STORAGE_USER, user);

});


/**
 * @method getUserLocalStorage
 * @description 
 * @param {} 
 */

 const getUserLocalStorage = (() => {
     
     return localStorage.getItem(LOCAL_STORAGE_USER);
    

});


export {saveTokenLocalStorage, getTokenLocalStorage, saveUserLocalStorage, getUserLocalStorage}