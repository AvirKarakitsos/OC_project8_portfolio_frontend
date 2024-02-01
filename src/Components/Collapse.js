import styles from "../assets/styles/Collapse.module.css"
import { useState, useContext } from "react"
import { ThemeContext } from "../utils/context/ThemeContext"

function Collapse({project, content}) {
    const { theme } = useContext(ThemeContext)
    const [isOpen, setIsOpen] = useState(false)
    
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
                <p className={`${styles.text}`}>{content[0]?.text}</p>
            </div>
        </div>
        )
    }

export default Collapse