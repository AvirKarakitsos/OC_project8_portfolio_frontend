import { API_URL } from "./constants";

export function getRequest(route, callback) { 
    fetch(`${API_URL}/api/${route}`)
        .then((response) => response.json())
        .then((response) => {
            callback(response)
        } )
        .catch((error) => console.log(error))
}

export function fetchRequest(route,requestOptions) {
    return fetch(`${API_URL}/api/${route}`, requestOptions)
}

export const getOptions = {
    method: "GET",
    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
}

export const deleteOptions = {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
}
