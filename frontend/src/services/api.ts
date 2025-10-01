import axios from "axios";

export const api = axios.create({
  baseURL: "https://e-commerce-9nrq.onrender.com/api",
  withCredentials: true,
});

// https://e-commerce-9nrq.onrender.com/api
// http://localhost:3333
