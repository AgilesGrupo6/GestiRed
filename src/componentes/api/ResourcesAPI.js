import axios from 'axios';

const baseURL = "https://gestiredback.herokuapp.com";

const getAllResources = (onComplete, onError) => {
  const url = baseURL + "/gestired/resource/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const getResourceByLabel = (label, onComplete, onError) => {
  const url = baseURL + "/gestired/resource/?labels__icontains=" + label;

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const getResourceById = (idResource, onComplete, onError) => {
  const url = baseURL + "/gestired/resource/" + idResource;

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const getResourceStages = (idResource, onComplete, onError) => {
  const url = baseURL + "/gestired/phase/?resources=" + idResource;

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

/* const getResourceByFilter = (phases, onComplete, onError) => {
  const url = baseURL + "/gestired/resource/" + idResource;

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
}; */

const ResourcesAPI = {
  getAllResources,
  getResourceByLabel,
  getResourceById,
  getResourceStages
};

export default ResourcesAPI;