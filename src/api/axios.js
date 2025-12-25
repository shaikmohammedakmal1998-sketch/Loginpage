import axios from "axios";

const api = axios.create({
  baseURL: "https://peopleix.duckdns.org",
});

export default api;
