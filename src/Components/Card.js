
import { useContext } from 'react';
import styles from '../assets/styles/Card.module.css'
import { ThemeContext } from '../utils/context/ThemeContext';

function Card({project, setModal}) {
    const { theme } = useContext(ThemeContext)
    const smallUrl = project.imageUrl.split("/images/")[0] + "/images/small/" + project.imageUrl.split("/images/")[1];
    const date = project.createdAt.split(".")[0]
    const name = date.split(":").join("")
    let bookmarkColor
    switch (project.type) {
        case "openclassrooms":
            bookmarkColor = "color-purple"
            break
        case "perso":
            bookmarkColor = "color-green"
            break
        default:
            bookmarkColor = "color-blue"
      }
  
    return (
        <article className={`box ${theme === "light" ? "" : "darker-2"}`}>
            <div className="relative">
                <h3 className="text-center">{project.title}</h3>
                <i className= {styles.bookmark+" "+bookmarkColor+" fa-solid fa-bookmark"}></i>
            </div>
            <div className='box-picture'>
                <picture className="picture" onClick={() => setModal(name)}>
                    <source media="(max-width: 450px)" srcSet={smallUrl}/>
                    <img src={project.imageUrl} alt="projet react"/>
                </picture>
            </div>
            <section className="box-section">
                <p><b>Tags: </b><span>{project.tags}</span></p>
                <p className="box-description">{project.content[0].text}</p>
                <p><a href={project.link} target="_blank" rel="noreferrer" className={theme === "light" ? "color-grey" : "color-white"}>Voir le code...</a></p>
            </section>
        </article>    
    )
}

export default Card