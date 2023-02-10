import axios from "axios";

const instance = axios.create({
  baseURL: "https://rest-api-server.onrender.com",
  // baseURL: "http://localhost:8080",
  // ,
  // maxBodyLength: Infinity,
  // maxContentLength: Infinity,
});

export default instance;
