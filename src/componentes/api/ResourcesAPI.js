import axios from 'axios';

const baseURL = "https://gestiredback-dev.herokuapp.com";

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

const getResourceByFilter = (phases,resourcesTypes,users, onComplete, onError) => {
  console.log('fase',phases,'tipo',resourcesTypes,'usuario',users);
  let url = baseURL + '/gestired/resourcesfilters/?';
  if(phases !== ""){
    url=url+'phaseType='+phases;
  }
  if(resourcesTypes !== ""){
    url = url + '&resourceType=' + resourcesTypes;
  }
  if(users !== ""){
    url = url + '&responsible=' + users;
  }
  console.log('consultando: ',url);
  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const ResourcesAPI = {
  getAllResources,
  getResourceByLabel,
  getResourceById,
  getResourceStages,
  getResourceByFilter
};

export default ResourcesAPI;