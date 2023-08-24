import photo from '../assets/images/photo-baobab.png'
import github from '../assets/images/github.png'
import twitter from '../assets/images/twitter.png'
import instagram from '../assets/images/insta.png'
import gmail from '../assets/images/gmail.png'

import Layout from "../Components/layouts/Layout"
import Card from '../Components/Card'
import { useState, useEffect } from 'react'

function Homefr() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		fetch('http://localhost:4000/api/projects')
			 .then((response) => response.json())
			 .then((response) => setProjects(response))
			 .catch((error) => console.log(error))
		 
	 }, [])

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
						<li className='btn dark'>Tous</li>
						<li className='btn dark'>Projets Openclassroom</li>
						<li className='btn dark'>Projets personnels</li>
					</ul>
				</section>

				<dialog id="modal">
					<div className="modal-container flex">
						<video src="./videos/Kasa.mp4" controls></video>
					</div>
				</dialog>

				<div className="box-container cursor-default">
					{projects.map(project => <Card key={project._id} project={project}/>)}
					
				</div>

            </main>
        </Layout>
    )
}

export default Homefr