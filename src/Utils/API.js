import axios from "axios";

const dev = true;

const API_URL = dev ? "http://localhost:5000" : "https://example.com";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default API;
