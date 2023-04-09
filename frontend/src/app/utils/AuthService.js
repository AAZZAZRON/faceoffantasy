import Routes from "./misc/routes";

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

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const refreshUser = () => {
    if (loggedIn()) {
        fetch(`${Routes.USER}/${getUser()["id"]}/`).then((res) => res.json()).then((res) => {
            setUser(res);
        }).catch((err) => {
            console.log(err);
        });
    } else {
        logout();
    }
}

const updateToken = (token) => {
    setToken(token);
    if (token !== "") {
        refreshUser();
    }
    else {
        setUser({});
    }
}

const logout = () => {
    if (!loggedIn()) return;
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    window.location.href = "/lyonhacks3/login";
}

export { getToken, setToken, getRefresh, setRefresh, loggedIn, logout, setUser, updateToken, refreshUser, getUser };