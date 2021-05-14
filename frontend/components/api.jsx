// api.js
import Axios from "axios";

let urls = {
  test: `http://localhost:8000`,
  development: "http://localhost:8000/",
  production: "",
};
const api = Axios.create({
  baseURL: urls["test"],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
