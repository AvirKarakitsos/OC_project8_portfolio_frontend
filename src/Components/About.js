import styles from '../assets/styles/About.module.css'
import { translate } from "../utils/common"
import { useContext, useEffect, useState } from "react"
import { LanguageContext } from "../utils/context/LanguageContext"
import { ThemeContext } from '../utils/context/ThemeContext'
import { getRequest } from '../utils/request'

function About() {
    const { theme } = useContext(ThemeContext)
    const { lang } = useContext(LanguageContext)
    const [ allContent, setAllContent] = useState(null)
    
    useEffect(() => {
        getRequest('contents',setAllContent)
    },[])
    
    return(
        <section id='about-me' className="section-1">
            <h2 className="text-center">{translate(lang).main.about.subTitle}</h2>
            <div className={`${styles["about-container"]} ${theme === "light" ? "bg-light-2" : "bg-darker-2"}`}>
                {allContent?.map( content => {
                    if (lang === "fr") return <p key={content._id}>{content.french}</p>
                    else return <p key={content._id}>{content.english}</p>
                })}
            </div>
        </section>
    )
}

export default About