import { API_URL } from "./constants";

export function getRequest(route, output, option=null) {
    fetch(`${API_URL}/api/${route}`)
        .then((response) => response.json())
        .then((response) => {
            option()
            output(response)
        } )
        .catch((error) => console.log(error))
}