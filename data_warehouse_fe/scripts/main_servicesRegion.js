const apiRegions = {
  createRegionData: (URL, data, token) => {
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

  getRegionsData: (URL, token) => {
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

  getRegionData: (URL, token, id) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `bearer ${token}`);
    return new Promise((resolve, reject) => {
      fetch(`${URL}${id}`, {
        method: "GET",
        headers: myHeaders,
      })
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error))
    });
  },

  editRegionData: (URL, data, token, id) => {
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

  deleteRegionData: (URL, token, id) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `bearer ${token}`);
    return new Promise((resolve, reject) => {

      fetch(`${URL}${id}`, {
        method: "DELETE",
        headers: myHeaders,
      })
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  },

  createCountryData: (URL, data, token) => {
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

  getCountriesData: (URL, token) => {
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

  getCountryData: (URL, token, id) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `bearer ${token}`);
    return new Promise((resolve, reject) => {
      fetch(`${URL}${id}`, {
        method: "GET",
        headers: myHeaders,
      })
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error))
    });
  },

  getCountriesByRegionData: (URL, token, id) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `bearer ${token}`);
    return new Promise((resolve, reject) => {
      fetch(`${URL}${id}`, {
        method: "GET",
        headers: myHeaders,
      })
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error))
    });
  },

  editCountryData: (URL, data, token, id) => {
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

  deleteCountryData: (URL, token, id) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `bearer ${token}`);
    return new Promise((resolve, reject) => {

      fetch(`${URL}${id}`, {
        method: "DELETE",
        headers: myHeaders,
      })
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  },

  createCityData: (URL, data, token) => {
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

  getCitiesData: (URL, token) => {
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

  getCityData: (URL, token, id) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `bearer ${token}`);
    return new Promise((resolve, reject) => {
      fetch(`${URL}${id}`, {
        method: "GET",
        headers: myHeaders,
      })
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error))
    });
  },

  getCitiesByCountryData: (URL, token, id) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `bearer ${token}`);
    return new Promise((resolve, reject) => {
      fetch(`${URL}${id}`, {
        method: "GET",
        headers: myHeaders,
      })
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error))
    });
  },

  editCityData: (URL, data, token, id) => {
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

  deleteCityData: (URL, token, id) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `bearer ${token}`);
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

export default apiRegions;
