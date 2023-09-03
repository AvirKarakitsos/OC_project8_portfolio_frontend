import { Outlet } from "react-router-dom"
import Error from "../pages/Error"

function RequireAuth() {
    let user = localStorage.getItem("userId")
    
    return (
        user ? <Outlet/> : <Error/>
    )
}

export default RequireAuth