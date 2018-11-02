import axios from 'axios';

const baseURL = "https://gestiredback-dev.herokuapp.com";

const getRoles = (onComplete, onError) => {
  const url = baseURL + "/gestired/rol/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const RolesAPI = {
  getRoles,
};

export default RolesAPI;