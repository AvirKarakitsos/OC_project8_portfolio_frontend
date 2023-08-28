import styles from "../assets/styles/Collapse.module.css"

function Collapse({project, content}) {

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
            container.style.height = "160px"
            article.style.height = "500px"
        } else {
            arrow.style.transform = "rotate(0deg)" 
            arrow.style.transition = "transform 1250ms"
            container.style.transform = "translateY(-150px)"
            container.style.height = "0"
            article.style.height = "350px"
        }
    }

    return (
        <div className={styles.bar}>     
            <div className={styles.title}>
                <i className={"fa-solid fa-circle-chevron-up arrow"+project._id} onClick={() => handleShow(project._id)}></i>
            </div>
            <div className={"content"+project._id+" "+styles.content}>
                <p className={styles.text}>{content[0]?.text}</p>
            </div>
        </div>
        )
    }

export default Collapse