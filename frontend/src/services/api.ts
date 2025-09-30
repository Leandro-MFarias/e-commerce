import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
  withCredentials: true,
});

// https://e-commerce-9nrq.onrender.com/api
// http://localhost:3333
