import axios from 'axios';

const baseURL = "https://gestiredback-dev.herokuapp.com";

const getAllUsers = (onComplete, onError) => {
  const url = baseURL + "/gestired/user/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log("heyy, rpta, users: " + response))
    .catch(onError ? onError : (error) => console.log(error));
};

const saveQualityResponsible = (data, onComplete, onError) => {
  const url = baseURL + "/gestired/qualityControl/";

  axios.post(url, {
    ...data
  })
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const UsersAPI = {
  getAllUsers,
  saveQualityResponsible
};

export default UsersAPI;