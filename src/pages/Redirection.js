import { Navigate } from "react-router-dom"

function Redirection() {
    let lang = localStorage.getItem("lang") ?? "fr"
    
    return (<Navigate to={`/${lang}`}/>)
}

export default Redirection