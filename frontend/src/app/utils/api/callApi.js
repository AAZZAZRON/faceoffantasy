export const callAndStore = async(cacheName, url) => {
    await fetch(url).then((response) => response.json()).then((data) => {
        localStorage.setItem(cacheName, JSON.stringify(data));
    }).catch((error) => console.log(error.message));
}
