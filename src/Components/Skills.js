import styles from '../assets/styles/Skills.module.css'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../utils/context/ThemeContext'
import { LanguageContext } from '../utils/context/LanguageContext'
import { translate } from '../utils/common'

function Skills() {
    const {theme} = useContext(ThemeContext)
    const {lang} = useContext(LanguageContext)

    const [skills, setSkills] = useState(null)
    const [client, setClient] = useState(null)
    const [server, setServer] = useState(null)
    const [tool, setTool] = useState(null)

    useEffect(() => {
		fetch('http://localhost:4000/api/skills')
        .then((response) => response.json())
        .then((response) => setSkills(response))
        .catch((error) => console.log(error))
	}, [])

     useEffect(() => {
        setClient(skills?.filter(value => value.category === "client"))
        setServer(skills?.filter(value => value.category === "server"))
        setTool(skills?.filter(value => value.category === "tool"))
    }, [skills])

    return (
        <section className='section-1'>
            <h2 className="text-center">{translate(lang).main.skills.subTitle}</h2>
            <div className={`${styles["skills-container"]} ${theme === "light" ? "bg-light-2" : "bg-darker-2"}`}>
                <div className="text-center">
                    <div className='flex direction-column tiny-row-gap-2'>
                        <i className="fa-solid fa-laptop font-size-medium color-grey"></i>
                        <p>client</p>
                    </div>
                    <ul className={styles.list+" no-bullet"}>
                        {client?.map(skill => <li key={skill._id}>{skill.name}</li>)}
                    </ul>
                </div>
                <div className="text-center">
                    <div className='flex direction-column tiny-row-gap-2'>
                        <i className="fa-solid fa-server font-size-medium color-grey"></i>
                        <p>{translate(lang).main.skills.server}</p>
                    </div>
                    <ul className={styles.list+" no-bullet"}>
                        {server?.map(skill => <li key={skill._id}>{skill.name}</li>)}
                    </ul>
                </div>
                <div className="text-center">
                    <div className='flex direction-column tiny-row-gap-2'>
                        <i className="fa-solid fa-gear font-size-medium color-grey"></i>
                        <p>{translate(lang).main.skills.tools}</p>
                    </div>
                    <ul className={styles.list+" no-bullet"}>
                        {tool?.map(skill => <li key={skill._id}>{skill.name}</li>)}
                    </ul>
                </div>
                </div>
        </section>
    )
}

export default Skills