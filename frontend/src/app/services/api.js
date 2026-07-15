import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.149:8000/api",
});

export default api;