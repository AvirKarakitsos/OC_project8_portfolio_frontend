import styles from '../assets/styles/Skills.module.css'
import { useContext } from 'react'
import { ThemeContext } from '../utils/context/ThemeContext'
import { LanguageContext } from '../utils/context/LanguageContext'
import { translate } from '../utils/common'

function Skills() {
    const {theme} = useContext(ThemeContext)
    const {lang} = useContext(LanguageContext)

    return (
        <section className='section-1'>
            <h2 className="text-center">{translate(lang).main.skills.subTitle}</h2>
            <div className={`${styles["skills-container"]} ${theme === "light" ? "bg-light-2" : "darker-2"}`}>
                <div className="text-center">
                    <div>
                        <i className="fa-solid fa-laptop font-size-medium color-grey"></i>
                        <p>client</p>
                    </div>
                    <ul className={styles.list+" no-bullet"}>
                        <li><strong>Javascript</strong></li>
                        <li><strong>React</strong></li>
                        <li>Vue</li>
                    </ul>
                </div>
                <div className="text-center">
                    <div>
                        <i className="fa-solid fa-server font-size-medium color-grey"></i>
                        <p>{translate(lang).main.skills.server}</p>
                    </div>
                    <ul className={styles.list+" no-bullet"}>
                        <li><strong>Node JS</strong></li>
                        <li>Laravel</li>
                        <li>PHP</li>
                    </ul>
                </div>
                <div className="text-center">
                    <div>
                        <i className="fa-solid fa-gear font-size-medium color-grey"></i>
                        <p>{translate(lang).main.skills.tools}</p>
                    </div>
                    <ul className={styles.list+" no-bullet"}>
                        <li><strong>MongoDB</strong></li>
                        <li>phpMyAdmin / mySQL</li>
                    </ul>
                </div>
                </div>
        </section>
    )
}

export default Skills