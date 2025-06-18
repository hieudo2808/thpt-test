import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Đảm bảo REACT_APP_API_URL đã được thiết lập trong .env
    headers: {
        "ngrok-skip-browser-warning": "69420",
    },
});

api.interceptors.request.use((config) => {
    config.headers["ngrok-skip-browser-warning"] = "69420";

    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
