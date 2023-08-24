import photo from '../assets/images/photo-baobab.png'
import github from '../assets/images/github.png'
import twitter from '../assets/images/twitter.png'
import instagram from '../assets/images/insta.png'
import gmail from '../assets/images/gmail.png'

import kasa from '../assets/images/projects/kasa.png'
import kasaSmall from '../assets/images/projects/small/kasa-small.png'

import Layout from "../Components/layouts/Layout"

function Homefr() {

    return (
        <Layout>
            <main>

                <section className="main-top flex justify-space align-center">
			    	<div className="div-left relative">
			    		<div className="frame-left absolute border-black"></div>
			    		<img className= "image-left relative" src={photo} alt="Allée de baobabs à Madagascar"/>
			    	</div>
			    	<div className="div-right flex justify-space align-center">
			    		<section className="cursor-default">
			    			<h1 className="title">Arno Cotsoyannis</h1>
			    			<h2>Développeur web full stack Javascript</h2>
			    		</section>
			    		<ul className="flex justify-center align-center no-bullet relative">
			    			<li className="link-1 absolute"><a href="https://github.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer"><img className="border-cercle" src={github} alt="lien github"/></a></li>
			    			<li className="link-2 absolute"><a href="https://www.instagram.com/avir.karakitsos" target="_blank" rel="noopener noreferrer"><img className="border-cercle" src={instagram} alt="lien instagram"/></a></li>
			    			<li className="link-3 absolute"><a href="https://twitter.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer"><img className="border-cercle" src={twitter} alt="lien twitter"/></a></li>
			    			<li className="link-4 absolute"><img className="border-cercle" onClick={() => alert('avir.karakitsos@gmail.com')} src={gmail} alt="email"/></li>
			    		</ul>
			    	</div>
			    </section>

				<section id='about-me'>
					<h2 className="subtitle">A Propos</h2>
					<div className="section-size">
						<p>En reconversion développeur web. Après m'être autoformé en apprenant les bases de HTML, CSS et Javascript, j'ai pu tester côté client Vue js et côté serveur php avec le framework Laravel. J'ai suivi en 2023 la formation Openclassrooms déveleppeur web afin de professionnalisé ma démarche et ainsi devenir développeur full stack Javascript.</p>
						<p>En scrollant sur cette page vous découvrirez mes projets personnels ainsi que mes projets chez <strong><a href="https://openclassrooms.com/fr/" target="_blank" rel="noreferrer">Openclassrooms</a></strong>. Vous pouvez cliquez sur l'image afin de visionner une démonstration du site. L'ensemble du code est disponible sur mon github.</p>
					</div>
				</section>

				<section>
					<h2 className="subtitle">Mes comptétences</h2>
					<div className="section-size">
						<p>Mes comptétences : <strong>Javascript</strong>, <strong>React</strong>, <strong>Node JS</strong></p>
						<p>Connaissance en <strong>Vue</strong>, <strong>PHP</strong>, <strong>Laravel</strong></p>
					</div>
				</section>

				<section id="project" className="filter flex">
					<h2 className="subtitle">Mes projets</h2>
					<ul className="list flex align-center justify-center no-bullet cursor-default">
						<li className='btn-dark'>Tous</li>
						<li className='btn-dark'>Projets Openclassroom</li>
						<li className='btn-dark'>Projets personnels</li>
					</ul>
				</section>

				<dialog id="modal">
					<div className="modal-container flex">
						<video src="./videos/Kasa.mp4" controls></video>
					</div>
				</dialog>

				<div className="box-container cursor-default">
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
				</div>

            </main>
        </Layout>
    )
}

export default Homefr