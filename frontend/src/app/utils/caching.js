export const getDataCache = (cacheName) => {
    var cache;
    try {
        const data = localStorage.getItem(cacheName);
        if (data) {
            cache = JSON.parse(data);
        }
    }
    catch (e) {
        console.log(e);
    }
    return cache;
}

export const deleteDataCache = (cacheName) => {
    try {
        localStorage.removeItem(cacheName);
    }
    catch (e) {
        console.log(e);
    }
}

export const purgeDataCache = () => {
    localStorage.clear();
    console.log("Cache purged");
}

// this doesn't work i combined it with callAPI
export const setDataCache = async (cacheName, data) => {
    console.log(data);
    try {
        await localStorage.setItem(cacheName, JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}