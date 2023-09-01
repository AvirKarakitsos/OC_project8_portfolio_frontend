
import { useContext, useEffect, useState } from 'react';
import styles from '../assets/styles/Card.module.css'
import { ThemeContext } from '../utils/context/ThemeContext';
import { LanguageContext } from '../utils/context/LanguageContext'
import { API_URL } from '../utils/constants'

import Collapse from './Collapse'

function Card({project, setModal}) {
    const { theme } = useContext(ThemeContext)
    const { lang } = useContext(LanguageContext)
    const [content, setContent] = useState(project.content.filter(input => input.lang === lang))
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const smallUrl = project.imageUrl.split("/images/")[0] + "/images/small/" + project.imageUrl.split("/images/")[1];
    const date = project.createdAt.split(".")[0]
    const name = date.split(":").join("")
    
    useEffect(() => {
        fetch(`${API_URL}/api/projects/${project._id}/color`)
        .then((response) => response.json())
        .then((response) => {
            setCategory(response)
            setIsLoading(false)
        })
        .catch((error) => console.log(error))
    },[project])

    useEffect(() => {
       setContent(project.content.filter(input => input.language === lang))
    },[lang,project])

    useEffect(() => {
        window.addEventListener("resize",()=> {
            setWindowWidth(window.innerWidth)
        })
    },[])

    useEffect(() => {
        document.querySelectorAll(`.${styles.box}`).forEach(box => {
            if(windowWidth <= 750) box.style.height = "340px"
            else box.style.height = "500px"
        })
    },[windowWidth])
  
    return (
        <article id={"article"+project._id} className={`${styles.box} ${theme === "light" ? "" : "bg-darker-2"}`}>
            <div className="relative">
                <h3 className="text-center">{project.title}</h3>
                {!isLoading && <i className={styles.bookmark+" fa-solid fa-bookmark" } style={{color: category[0].color}}></i>}
            </div>
            <div>
                <picture onClick={() => setModal(name)}>
                    <source media="(max-width: 450px)" srcSet={smallUrl}/>
                    <img className={styles.image} src={project.imageUrl} alt={`projet ${project.title}`}/>
                </picture>
            </div>
            <section className={styles["box-section"]}>
                <p>{windowWidth > 750 && <b>Tags: </b>}<span>{project.tags}</span></p>
                {windowWidth <= 750 
                    ? <Collapse project={project} content={content}/>
                    : <p className={styles["box-description"]}>{content[0]?.text}</p>
                }
                <p><a href={project.link} target="_blank" rel="noreferrer" className={theme === "light" ? "color-grey" : "color-white"}>Voir le code...</a></p>
            </section>
        </article>    
    )
}

export default Card