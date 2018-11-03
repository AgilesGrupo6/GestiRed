import axios from 'axios';

const baseURL = "https://gestiredback-dev.herokuapp.com";

const getQualityControl = (onComplete, onError) => {
  const url = baseURL + "/gestired/qualityControl/";

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const sendNotification = (data, onComplete, onError) => {
  const url = baseURL + "/gestired/quality_review_notification/";

  axios.post(url, {
    ...data
  })
    .then(onComplete? onComplete : (response) => console.log(response))
    .catch(onError? onError : (error) => console.log(error));
};

const getComments = (idResource,onComplete, onError) => {
  const url = baseURL + "/gestired/comments/?resource="+idResource;

  axios.get(url)
    .then(onComplete ? onComplete : (response) => console.log(response))
    .catch(onError ? onError : (error) => console.log(error));
};

const postComments = (data, onComplete, onError) => {
  const url = baseURL + "/gestired/comments/";

  axios.post(url, {
    ...data
  })
    .then(onComplete? onComplete : (response) => console.log(response))
    .catch(onError? onError : (error) => console.log(error));
};



const QualityControlAPI = {
  getQualityControl,
  sendNotification,
  getComments,
  postComments
};

export default QualityControlAPI;