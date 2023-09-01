import { API_URL } from "./constants";

export function getRequest(route, output) { 
    fetch(`${API_URL}/api/${route}`)
        .then((response) => response.json())
        .then((response) => {
            output(response)
        } )
        .catch((error) => console.log(error))
}