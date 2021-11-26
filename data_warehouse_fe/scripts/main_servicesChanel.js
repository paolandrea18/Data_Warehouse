const apiChanels = {
    createChanelData: (URL, data, token) => {
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
  
    getChanelsData: (URL, token) => {
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
  
    getChanelData: (URL, token, id) => {
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
  
    editChanelData: (URL, data, token, id) => {
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
  
    deleteChanelData: (URL, token, id) => {
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
  
  export default apiChanels;
  