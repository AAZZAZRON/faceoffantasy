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

export const setActiveTeam = (team) => {
    localStorage.setItem("activeTeam", JSON.stringify(team));
}

export const getActiveTeam = () => {
    return JSON.parse(localStorage.getItem("activeTeam"));
}

export const hasActiveTeam = () => {
    return !(!localStorage.getItem("activeTeam"));
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
    window.location.href = "/faceoffantasy/login";
}

export { getToken, setToken, getRefresh, setRefresh, loggedIn, logout, setUser, updateToken, refreshUser, getUser };