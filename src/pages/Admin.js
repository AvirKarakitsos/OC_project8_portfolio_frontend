import styles from '../assets/styles/Form.module.css'
import FormSkill from '../Components/admin/FormSkill'
import FormProject from '../Components/admin/FormProject'
import FormVideo from '../Components/admin/FormVideo'
import FormContent from '../Components/admin/FormContent'
import FormCategory from '../Components/admin/FormCategory'
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'

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
            <div className={styles.section}>
                <h1>Page Admin</h1>
                <ul className="width-100 flex justify-space no-bullet small-column-gap">
                    <li><Link to="/">Page d'accueil</Link></li>
                    <li className="cursor-default" onClick={logout}>Déconnexion</li>
                </ul>
                <div className="flex">
                    <ul className={styles.list}>
                        <li onClick={() => setSelect("projet")}>Mes Projets</li>
                        <li onClick={() => setSelect("skill")}>Mes Compétences</li>
                        <li onClick={() => setSelect("video")}>Vidéos</li>
                        <li onClick={() => setSelect("about")}>A Propos</li>
                        <li onClick={() => setSelect("category")}>Catégories</li>
                    </ul>
                </div>
            </div>
            <p className={`message ${styles["message-style"]}`}></p>
                {select === 'project' 
                    ? <FormProject/> 
                    : select === 'skill' 
                        ? <FormSkill/> 
                        : select === "video" 
                            ? <FormVideo/> 
                            : select === "about" 
                                ? <FormContent/> 
                                : select=== "category"
                                    ? <FormCategory/> : <FormProject/>}
        </>
    )
}

export default Admin