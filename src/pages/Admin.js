import { useState } from "react";
import Project from "../Components/admin/Project";
import Content from "../Components/admin/Content";
import styles from '../assets/styles/Form.module.css'

function Admin() {
    const [select, setSelect] = useState(true)
    
    return (
        <>
            <div className="section-2 flex direction-column align-center justify-center small-row-gap">
                <h1>Page Admin</h1>
                <ul className="width-100 flex justify-space no-bullet small-column-gap">
                    <li>Retour</li>
                    <li>Déconnexion</li>
                </ul>
                <div className="flex">
                    <ul className="flex small-column-gap no-bullet">
                        <li onClick={() => setSelect(true)}>Mes Projets</li>
                        <li onClick={() => setSelect(false)}>Mon Contenu</li>
                    </ul>
                </div>
            </div>
            <p className={`message ${styles["message-style"]}`}></p>
                {select
                    ? <Project/>
                    : <Content/>
                }
        </>
    )
}

export default Admin