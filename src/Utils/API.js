import axios from "axios";

const API_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default API;
