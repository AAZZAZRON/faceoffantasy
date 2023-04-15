export const callAPI = async(url) => {
    return await fetch(url).then((response) => response.json())
    .catch((error) => console.error(error.message));
}
