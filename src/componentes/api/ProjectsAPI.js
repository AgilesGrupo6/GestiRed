import axios from 'axios';
import baseURL from './config';


const getAllProjects = (onComplete, onError) => {
  const url = baseURL + "/gestired/project/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const getProjectsByLabel = (label, onComplete, onError) => {
  const url = baseURL + "/gestired/project/?labels__icontains=" + label;

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const getProjectsById = (idProject, onComplete, onError) => {
  const url = baseURL + "/gestired/project/" + idProject + "/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const getProjectsByFilter = (phases, onComplete, onError) => {
  const url = baseURL + '/gestired/resourcesfilters/?phaseType='+phases;
  console.log('consultando: ',url);
  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const ProjetsAPI = {
  getAllProjects,
  getProjectsByLabel,
  getProjectsById,
  getProjectsByFilter
};

export default ProjetsAPI;