import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Đảm bảo REACT_APP_API_URL đã được thiết lập trong .env
    headers: {
        "ngrok-skip-browser-warning": true, // Header bất kỳ giá trị nào cũng được ngrok chấp nhận
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
