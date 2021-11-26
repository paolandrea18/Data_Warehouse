const apiContacts = {
    createContactData: (URL, data, token) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `bearer ${token}`);
      return new Promise((resolve, reject) => {
        fetch(URL, {
          method: "POST",
          body: JSON.stringify(data),
          headers: myHeaders,
        })
          .then((response) => resolve(response.json()))
          .catch((error) => reject(error));
      });
    },
  
    getContactsData: (URL, token, orderBy = 'contactName', orderByDirection = 'ASC') => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `bearer ${token}`);
      return new Promise((resolve, reject) => {
        fetch(`${URL}?orderBy=${orderBy}&orderByDirection=${orderByDirection}`, {
          method: "GET",
          headers: myHeaders,
        })
          .then((response) => resolve(response.json()))
          .catch((error) => reject(error));
      });
    },
  
    getContactData: (URL, token, id) => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${token}`);
      return new Promise((resolve, reject) => {
        fetch(`${URL}${id}`, {
          method: "GET",
          headers: myHeaders,
        })
          .then((response) => resolve(response.json()))
          .catch((error) => reject(error));
      });
    },
  
    editContactData: (URL, data, token, id) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `bearer ${token}`);
      return new Promise((resolve, reject) => {
        fetch(`${URL}${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: myHeaders,
        })
          .then((response) => resolve(response.json()))
          .catch((error) => reject(error));
      });
    },
  
    deleteContactData: (URL, token, id) => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${token}`);
      return new Promise((resolve, reject) => {
        fetch(`${URL}${id}`, {
          method: "DELETE",
          headers: myHeaders,
        })
          .then((response) => resolve(response.json()))
          .catch((error) => reject(error));
      });
    },
    filterContactData: (URL, data, token) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `bearer ${token}`);
      return new Promise((resolve, reject) => {
        fetch(URL, {
          method: "POST",
          body: JSON.stringify(data),
          headers: myHeaders,
        })
          .then((response) => resolve(response.json()))
          .catch((error) => reject(error));
      });
    },
  };
  
  export default apiContacts;
  