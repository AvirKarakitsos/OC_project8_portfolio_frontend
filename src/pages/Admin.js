import { useState } from "react";
import Project from "../Components/admin/Project";
import Content from "../Components/admin/Content";
import styles from '../assets/styles/Form.module.css'
import { Link, useNavigate } from "react-router-dom";

function Admin() {
    const [select, setSelect] = useState("project")
    const navigate = useNavigate()
    
    const logout = function() {
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <>
            <div className="section-2 flex direction-column align-center justify-center small-row-gap">
                <h1>Page Admin</h1>
                <ul className="width-100 flex justify-space no-bullet small-column-gap">
                    <li><Link to="/">Page d'accueil</Link></li>
                    <li onClick={logout}>Déconnexion</li>
                </ul>
                <div className="flex">
                    <ul className="flex small-column-gap no-bullet">
                        <li onClick={() => setSelect("projet")}>Mes Projets</li>
                        <li onClick={() => setSelect("skill")}>Mon Contenu</li>
                    </ul>
                </div>
            </div>
            <p className={`message ${styles["message-style"]}`}></p>
                {select === 'project' ? <Project/> : select === 'skill' ? <Content/> : <Project/>}
        </>
    )
}

export default Admin