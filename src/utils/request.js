import { SERVER_URL } from "./constants";

export function getRequest(route, callback) { 
    fetch(`${SERVER_URL}/api/${route}`)
        .then((response) => response.json())
        .then((response) => {
            callback(response)
        } )
        .catch((error) => console.log(error))
}

export function fetchRequest(route,requestOptions) {
    return fetch(`${SERVER_URL}/api/${route}`, requestOptions)
}

export const getOptions = {
    method: "GET",
    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
}

export const deleteOptions = {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
}

export const requestOptions = function(method,body,option=false) {
    let result = null
    if(option) {
        result = {
            method: method,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: body
        }
    } else {
        result = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        }
    }
    return result
}
