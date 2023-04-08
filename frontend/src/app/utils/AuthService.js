const getToken = () => {
    return localStorage.getItem("token");
}

const setToken = (token) => {
    localStorage.setItem("token", token);
}

const getRefresh = () => {
    return localStorage.getItem("refresh");
}

const setRefresh = (refreshToken) => {
    localStorage.setItem("refresh", refreshToken);
}

const loggedIn = () => {
    return !(!localStorage.getItem("token"));
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
}

export { getToken, setToken, getRefresh, setRefresh, loggedIn, logout };