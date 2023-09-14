import styles from '../assets/styles/Card.module.css'
import Collapse from './Collapse'
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../utils/context/ThemeContext';
import { LanguageContext } from '../utils/context/LanguageContext'
import { getRequest } from '../utils/request';
import { translate } from '../utils/common'

function Card({project, setModal}) {
    const { theme } = useContext(ThemeContext)
    const { lang } = useContext(LanguageContext)
    const [content, setContent] = useState(project.content.filter(input => input.lang === lang))
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const smallUrl = project.imageUrl.split(".com/")[0] + ".com/small-" + project.imageUrl.split(".com/")[1];
    const callback = function(values) {
        setCategory(values)
        setIsLoading(false)
    }
    
    useEffect(() => getRequest(`projects/${project._id}/category`,callback),[project])

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
            else box.style.height = "550px"
        })
    },[windowWidth])
  
    return (
        <article id={"article"+project._id} className={`${styles.box} ${theme === "light" ? "" : "bg-darker-2"}`}>
            <div className="relative">
                <h3 className="text-center">{project.title}</h3>
                {!isLoading && <i className={styles.bookmark+" fa-solid fa-bookmark" } style={{color: category[0].color}}></i>}
            </div>
            <div>
                <picture onClick={() => setModal(project._id)}>
                    <source media="(max-width: 315px)" srcSet={smallUrl}/>
                    <img className={styles.image} src={project.imageUrl} alt={`projet ${project.title}`}/>
                </picture>
            </div>
            <section className={styles["box-section"]}>
                <p>{windowWidth > 750 && <b>Tags: </b>}<span>{project.tags}</span></p>
                {windowWidth <= 750 
                    ? <Collapse project={project} content={content}/>
                    : <p className={styles["box-description"]}>{content[0]?.text}</p>
                }
                <p><a href={project.link} target="_blank" rel="noreferrer" className={theme === "light" ? "color-grey" : "color-white"}>{translate(lang).main.projects.link}</a></p>
            </section>
        </article>    
    )
}

export default Card