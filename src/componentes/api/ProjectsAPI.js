import axios from 'axios';

const baseURL = "http://gestiredback.herokuapp.com";

const getAllProjects = (onComplete, onError) => {
  const url = baseURL + "/gestired/project/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const getProjectsByLabel = (label,onComplete, onError) => {
  const url = baseURL + "/gestired/project/?etiquetas__icontains=" + label;

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const getProjectsById = (idProject,onComplete, onError) => {
  const url = baseURL + "/gestired/project/" + idProject +"/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const ProjetsAPI = {
  getAllProjects,
  getProjectsByLabel,
  getProjectsById
};

export default ProjetsAPI;