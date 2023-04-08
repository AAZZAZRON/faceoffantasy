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

// this doesnt work i combined it with callAPI
export const setDataCache = async (cacheName, data) => {
    console.log(data);
    try {
        await localStorage.setItem(cacheName, JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}