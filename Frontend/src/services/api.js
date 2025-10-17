// frontend/src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default api;
