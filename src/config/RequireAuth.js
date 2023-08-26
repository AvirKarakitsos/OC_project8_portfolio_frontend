import Error from "../pages/Error"
import { Outlet } from "react-router-dom"

function RequireAuth() {
    let user = localStorage.getItem("userId")
    console.log(user)
    
    return (
        user ? <Outlet/> : <Error/>
    )
}

export default RequireAuth