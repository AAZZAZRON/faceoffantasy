import * as React from 'react';
import jwt_decode from "jwt-decode";
import { default as axios } from 'axios';
import Routes from './misc/routes';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken, getRefresh, setRefresh, loggedIn } from "./AuthService";

export const SessionContext = React.createContext({
    user: {},
    allUsers: [],
    allOrgs: [],
    setUser: (user) => { },
    updateToken: (token) => { },
    getAPI: (url, auth) => { return {}},
    postAPI: (url, data) => { return {}},
    putAPI: (url, data) => { return {}},
    patchAPI: (url, data) => { return {}},
    refreshAuth: () => { },
    logout: () => { }
});

export const SessionProvider = (props) => {
    let [user, updateUser] = React.useState({});
    const [allUsers, setAllUsers] = React.useState([]);
    const [allOrgs, setAllOrgs] = React.useState([]);
    const nav = useNavigate();

    const setUser = (newUser) => {
        user = newUser;
        updateUser(newUser);
    }

    const refreshUser = () => {
        if (loggedIn()) {
            getAPI(`${Routes.USER}/${user.id}`).then((res) => {
                setUser({
                    ...user,
                    ...res.data
                });
            }).catch((err) => {
                refreshAuth();
            });
        }
    }

    React.useEffect(() => {
        if (loggedIn()) {
            updateToken(getToken());
            refreshUser();
        }

        getAPI(`${Routes.OBJECT}/user`).then((res) => {
            setAllUsers(res.data.results);
        }).catch((err) => {

        });

        getAPI(`${Routes.OBJECT}/organization`).then((res) => {
            setAllOrgs(res.data.results);
        }).catch((err) => {

        });
    }, []);

    const updateToken = (token) => {
        setToken(token);
        if (token !== "") {
            let decoded = jwt_decode(token);

            setUser({
                ...user,
                id: decoded.user_id,
                registertime: decoded.iat
            });

            refreshUser();
        }
        else {
            setUser({});
        }
    }

    function getAPI(url, auth){
        if (auth && !loggedIn()) {
            nav("/accounts/login");
        }
        const token = getToken();
        return axios.get(url, auth ? {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } : {});
    }

    const postAPI = (url, data)=> {
        if (!loggedIn()) {
            nav("/accounts/login");
        }
        const token = getToken();
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const putAPI = (url , data) => {
        if (!loggedIn()) {
            nav("/accounts/login");
        }
        const token = getToken();
        return axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const patchAPI = (url, data) => {
        const token = getToken();
        return axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    const refreshAuth = () => {
        if (!loggedIn()) return;

        axios.post(Routes.AUTH.REFRESH, {
            refresh: getRefresh()
        }, {}).then((res) => {
            updateToken(res.data.access);
            setRefresh(res.data.refresh);
        }).catch((err) => {
            console.log("Refresh expired. Logging out.");
            logout();
        });
    }

    const logout = () => {
        if (!loggedIn()) return;

        setUser({});
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        nav("/accounts/login");
    }

    return (
        <SessionContext.Provider value={{ user: user, allUsers: allUsers, allOrgs: allOrgs, setUser: setUser, updateToken: updateToken, getAPI: getAPI, postAPI: postAPI, putAPI: putAPI, patchAPI: patchAPI, refreshAuth: refreshAuth, logout: logout }}>
            {props.children}
        </SessionContext.Provider>
    )
}