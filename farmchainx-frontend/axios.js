import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // replace 8080 with your Spring Boot port
});

export default API;
