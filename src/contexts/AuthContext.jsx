import { createContext, useContext, useState, useEffect } from "react";
const api = require("../services/api");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");

    const login = async (token, userData) => {
        // CHỈ lưu token vào localStorage
        localStorage.setItem("token", token);

        // KHÔNG lưu token vào state hoặc bất kỳ đâu khác
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const { data } = await api.get("/users/me");
                setUser(data);
            } catch (error) {
                localStorage.removeItem("token");
            }
        };

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
