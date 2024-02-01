import styles from '../assets/styles/Card.module.css'
import Collapse from './Collapse'
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../utils/context/ThemeContext';
import { LanguageContext } from '../utils/context/LanguageContext'
import { getRequest } from '../utils/request';
import { translate } from '../utils/common'

function Card({project, setModal, setVideo}) {
    const { theme } = useContext(ThemeContext)
    const { lang } = useContext(LanguageContext)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    const smallUrl = project.imageUrl.split(".com/")[0] + ".com/small-" + project.imageUrl.split(".com/")[1];
    const callback = function(values) {
        setCategory(values)
        setIsLoading(false)
    }
    
    useEffect(() => getRequest(`projects/${project._id}/category`,callback),[project])

    useEffect(() => {
        window.addEventListener("resize",()=> {
            setWindowWidth(window.innerWidth)
        })
    },[])

    function option(param) {
        setVideo(param)
        setModal(true)
    }

    function handleModal(id) {
        getRequest(`projects/${id}/video`,option)
    }
  
    return (
        <article 
            className={isOpen 
                ? `${styles.collapseOpen} ${styles.box} ${theme === "light" ? "" : "bg-darker-2"}`
                : `${styles.box} ${theme === "light" ? "" : "bg-darker-2"}`}>
            <div className="relative">
                <h3 className="text-center">{project.title}</h3>
                {!isLoading && <i className={styles.bookmark+" fa-solid fa-bookmark" } style={{color: category[0].color}}></i>}
            </div>
            <div>
                <picture onClick={() => handleModal(project._id)}>
                    <source media="(max-width: 315px)" srcSet={smallUrl}/>
                    <img className={styles.image} src={project.imageUrl} alt={`projet ${project.title}`}/>
                </picture>
            </div>
            <section className={styles["box-section"]}>
                <p>{windowWidth > 750 && <b>Tags: </b>}<span>{project.tags}</span></p>
                {windowWidth <= 750 
                    ? <Collapse isOpen={isOpen} setIsOpen={setIsOpen} project={project}/>
                    : project.content.map((input) => (input.language === lang) && <p className={styles["box-description"]}>{input?.text}</p>)
                }
                <p><a href={project.link} target="_blank" rel="noreferrer" className={theme === "light" ? "color-grey" : "color-white"}>{translate(lang).main.projects.link}</a></p>
            </section>
        </article>    
    )
}

export default Card