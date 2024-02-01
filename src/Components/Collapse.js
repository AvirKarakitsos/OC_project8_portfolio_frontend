import styles from "../assets/styles/Collapse.module.css"
import { useContext } from "react"
import { ThemeContext } from "../utils/context/ThemeContext"
import { LanguageContext } from '../utils/context/LanguageContext'

function Collapse({isOpen, setIsOpen, project}) {
    const { theme } = useContext(ThemeContext)
    const { lang } = useContext(LanguageContext)
    
    return (
        <div className={styles.bar}>
            <button className={`border-grey ${styles.title} ${theme === "light" ? "bg-light-1" : "bg-darker-1"}`} onClick={() => setIsOpen((value) => !value)}>
                    { isOpen
                    ? <i className="fa-solid fa-chevron-up arrow"></i>
                    : <i className={styles.iconeOpen+" fa-solid fa-chevron-up arrow"}></i>
                    }
            </button>   

            <div 
                className={isOpen
                    ? `${styles.collapseOpen} ${styles.content} ${theme === "light" ? "" : "color-white"}`
                    : `${styles.content} ${theme === "light" ? "" : "color-white"}`}>
                {project.content.map((input) => 
                    (input.language === lang) && <p className={styles["box-description"]}>{input?.text}</p>)}
            </div>
        </div>
        )
    }

export default Collapse