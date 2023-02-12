export default () => {
    return fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: 'GET'
    }) 
        .then(response => response.json())
}