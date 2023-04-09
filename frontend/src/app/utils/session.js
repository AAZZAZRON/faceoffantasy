import * as React from 'react';
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
    refreshAuth: () => { },
    logout: () => { }
});

export const SessionProvider = (props) => {
    let [user, updateUser] = React.useState({});
    const [allUsers, setAllUsers] = React.useState([]);
    const nav = useNavigate();

    const setUser = (newUser) => {
        user = newUser;
        updateUser(newUser);
        console.log("updated user");
    }

    const refreshUser = () => {
        if (loggedIn()) {
            fetch(`${Routes.USER}/${user.id}`).then((res) => res.json()). then((res) => {
                setUser(res);
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
    }, []);

    const updateToken = (token) => {
        setToken(token);
        if (token !== "") {
            refreshUser();
        }
        else {
            setUser({});
        }
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
    }

    return (
        <SessionContext.Provider value={{ user: user, allUsers: allUsers, setUser: setUser, updateToken: updateToken, refreshAuth: refreshAuth, logout: logout }}>
            {props.children}
        </SessionContext.Provider>
    )
}