import { getDataCache } from "./caching";

export const callAndStore = async(cacheName, url) => {
    await fetch(url).then((response) => response.json()).then((data) => {
        if (cacheName === "LEAGUES") {
            const userId = getDataCache("user").id;
            data = data.filter((league) => {
                return league.users.includes(userId);
            });
        }
        localStorage.setItem(cacheName, JSON.stringify(data));
    }).catch((error) => console.log(error.message));
}

export async function fetchData(cacheName, url) {
    if (!getDataCache(cacheName)) {
        await callAndStore(cacheName, url);
    }
    else console.log("Cache found for " + cacheName);
}
