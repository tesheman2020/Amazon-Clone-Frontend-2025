import axios from "axios";

const axiosInstance = axios.create({
  //Local instance of firebasefunctions
  // baseURL: "http://127.0.0.1:5001/clone-67520/us-central1/api",

  //deployed version of firebase function
  // baseURL: "https://api-7czywuyaua-uc.a.run.app/",

  //deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-xecw.onrender.com/",

  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export { axiosInstance };
