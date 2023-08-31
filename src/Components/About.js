import styles from '../assets/styles/About.module.css'
import { translate } from "../utils/common"
import { useContext } from "react"
import { LanguageContext } from "../utils/context/LanguageContext"
import { ThemeContext } from '../utils/context/ThemeContext'

function About() {
    const { theme } = useContext(ThemeContext)
    const { lang } = useContext(LanguageContext)

    return(
        <section id='about-me' className="section-1">
            <h2 className="text-center">{translate(lang).main.about.subTitle}</h2>
            <div className={`${styles["about-container"]} ${theme === "light" ? "bg-light-2" : "bg-darker-2"}`}>
                <p>{translate(lang).main.about.content1}</p>
                <p>{translate(lang).main.about.content2}</p>
            </div>
        </section>
    )
}

export default About