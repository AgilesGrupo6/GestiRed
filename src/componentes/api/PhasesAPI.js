import axios from 'axios';
import baseURL from './config';


const createNewPhase = (data, onComplete, onError) => {
  const url = baseURL + "/gestired/phase/";

  axios.post(url, {
    ...data
  })
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const PhasesAPI = {
  createNewPhase,

};

export default PhasesAPI;