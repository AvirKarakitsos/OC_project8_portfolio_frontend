import styles from "../assets/styles/Collapse.module.css"
import { useContext } from "react"
import { ThemeContext } from "../utils/context/ThemeContext"

function Collapse({project, content}) {
    const { theme } = useContext(ThemeContext)

    //Animation for the collapse
    function handleShow(id) {
        let article= document.getElementById(`article${id}`)
        let arrow = document.querySelector(`.arrow${id}`)
        let container = document.querySelector(`.content${id}`)
        
        arrow.classList.toggle("rotate")   
        
        if (arrow.classList.contains("rotate")) {
            arrow.style.transform = "rotate(-180deg)" 
            arrow.style.transition = "transform 1250ms" 
            container.style.transform = "translateY(0)"; 
            container.style.height = "180px"
            article.style.height = "520px"
        } else {
            arrow.style.transform = "rotate(0deg)" 
            arrow.style.transition = "transform 1250ms"
            container.style.transform = "translateY(-150px)"
            container.style.height = "0"
            article.style.height = "340px"
        }
    }

    return (
        <div className={styles.bar}>     
            <button className={`border-grey ${styles.title} ${theme === "light" ? "bg-light-1" : "bg-darker-1"}`} onClick={() => handleShow(project._id)}>
                <i className={"fa-solid fa-chevron-up arrow"+project._id}></i>
            </button>
            <div className={`content${project._id} ${styles.content} ${theme === "light" ? "" : "color-white"}`}>
                <p className={`${styles.text}`}>{content[0]?.text}</p>
            </div>
        </div>
        )
    }

export default Collapse