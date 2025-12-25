import axios from "axios";

const api = axios.create({
  baseURL: "http://3.111.36.255:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
