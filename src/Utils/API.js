import axios from "axios";

const dev = process.env.NODE_ENV !== "production";

const API_URL = dev ? "http://localhost:5000" : "http://localhost:5000";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default API;
