const api = {
  loginUserData: (URL, data) => {
    return new Promise((resolve, reject) => {
      fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  },
  registerUserData: (URL, data, token) => {
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

  getUsersData: (URL, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `bearer ${token}`);
    return new Promise((resolve, reject) => {
      fetch(URL, {
        method: "GET",
        headers: myHeaders,
      })
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  },

  getUserData: (URL, token, id) => {
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

  editUserData: (URL, data, token, id) => {
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

  deleteUserData: (URL, token, id) => {
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
};

export default api;
