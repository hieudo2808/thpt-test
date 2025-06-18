export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
};

export const getAuthToken = () => {
    return localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("token");
};
