import { getDataCache } from "./caching";

export const callAndStore = async(cacheName, url) => {
    return await callAPI(url).then((data) => {
        if (cacheName === "LEAGUES") {
            const userId = getDataCache("user").id;
            data = data.filter((league) => {
                return league.users.includes(userId);
            });
        }
        if (cacheName === "TEAMS") {
            const user = getDataCache("user");
            data = data.filter((team) => {
                return user.teams.includes(team.id);
            });
        }
        // console.log(cacheName + " " + JSON.stringify(data));
        localStorage.setItem(cacheName, JSON.stringify(data));
        return data;
    }).catch((error) => console.error(error.message));
}

export const callAPI = async(url) => {
    return await fetch(url).then((response) => response.json())
    .catch((error) => console.error(error.message));
    // console.log(url);
    // return await fetch(url)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     return data;
    // })
    // .catch(error => {console.log(error)});
}

export async function fetchData(cacheName, url) {
    if (!getDataCache(cacheName)) {
        await callAndStore(cacheName, url);
    }
    else console.log("Cache found for " + cacheName);
}
