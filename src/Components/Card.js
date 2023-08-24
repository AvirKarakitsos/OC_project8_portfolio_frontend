import kasa from '../assets/images/projects/kasa.png'
import kasaSmall from '../assets/images/projects/small/kasa-small.png'

function Card() {
    
    return (
        <article className="box">
            <h3 className="subtitle">React</h3>
            <div className="box-link no-decoration">
                <picture className="picture">
                    <source media="(max-width: 450px)" srcSet={kasaSmall}/>
                    <img src={kasa} alt="projet react"/>
                </picture>
            </div>
            <section className="box-section">
                <p><b>Tags: </b><span>Router, Hooks, SCSS, BEM</span></p>
                <p className="box-description">Refonte de la partie frontend d'un site immobilier. J'ai appris les base de React avec la construction du code à l'aide de composants. J'ai également défini le router à l'aide de la librairie react-router-dom et j'ai utilisé les hooks useState et useEffect. De manière générale j'ai appris l'avantage de travailler avec la librairie React. A noter sur ce projet l'utilisation de SCSS qui m'a plutôt convaincu dans son architecture.</p>
                <p><a href="https://github.com/AvirKarakitsos/OC_project6_react" target="_blank" rel="noreferrer">En savoir plus...</a></p>
            </section>
        </article>    
    )
}

export default Card