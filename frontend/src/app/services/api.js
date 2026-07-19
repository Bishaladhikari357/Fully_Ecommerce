import axios from "axios";

const api = axios.create({
    baseURL: "https://fully-ecommerce-1.onrender.com/api",
});

export default api;