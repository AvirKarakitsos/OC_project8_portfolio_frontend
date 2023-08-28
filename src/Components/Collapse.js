import { useContext } from "react"
import styles from "../assets/styles/Collapse.module.css"
import { ThemeContext } from "../utils/context/ThemeContext"

function Collapse({project, content}) {
    const { theme } = useContext(ThemeContext)

    //Animation for the collapse
    function handleShow(id) {
        let article= document.getElementById(`article${id}`)
        //let number = content[0].length
        let arrow = document.querySelector(`.arrow${id}`)
        let container = document.querySelector(`.content${id}`)
        
        arrow.classList.toggle("rotate")   
        
        if (arrow.classList.contains("rotate")) {
            arrow.style.transform = "rotate(-180deg)" 
            arrow.style.transition = "transform 1250ms" 
            container.style.transform = "translateY(0)"; 
            //( ((number > 3) && (number < 10)) || (number > 250) ) ? container.style.height = "160px" : container.style.height = "90px"
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
            <div className={`${styles.title} ${theme === "light" ? "bg-light-2" : "darker-1"}`} onClick={() => handleShow(project._id)}>
                <i className={"fa-solid fa-chevron-up arrow"+project._id}></i>
            </div>
            <div className={`content${project._id} ${styles.content} ${theme === "light" ? "" : "color-white"}`}>
                <p className={`${styles.text}`}>{content[0]?.text}</p>
            </div>
        </div>
        )
    }

export default Collapse