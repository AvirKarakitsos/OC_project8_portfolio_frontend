import styles from '../assets/styles/'
import photo from '../assets/images/photo-baobab.png'
import github from '../assets/images/github.png'
import twitter from '../assets/images/twitter.png'
import instagram from '../assets/images/insta.png'
import gmail from '../assets/images/gmail.png'

import Layout from "../Components/layouts/Layout"
import Card from '../Components/Card'
import Modal from '../Components/Modal'
import Skills from '../Components/Skills'
import About from '../Components/About'

import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../utils/context/ThemeContext'
import { LanguageContext } from '../utils/context/LanguageContext'
import { translate } from '../utils/common'

function Home() {
	const {theme} = useContext(ThemeContext)
	const {lang, toggleLanguage} = useContext(LanguageContext)

	const [projects, setProjects] = useState([])
	const [modal, setModal] = useState("")
	const [filter, setFilter] = useState(false)
	const [table, setTable] = useState(false)

	const handleFilter = function(tag) {
		if(tag === "all") setTable(projects)
		else {
			setTable(projects.filter(element => element.type === tag))
			setFilter(true)
		}
	}

	useEffect(() => {
		fetch('http://localhost:4000/api/projects')
			 .then((response) => response.json())
			 .then((response) => setProjects(response))
			 .catch((error) => console.log(error))
		 
	 }, [])

	useEffect(() => {
		toggleLanguage(window.location.pathname.substring(1))
	 }, [toggleLanguage])
	
    return (
        <Layout>
            <main className={styles["main-container"]}>
                <section className="h-100vh flex justify-space align-center">
			    	<div className="div-left relative">
			    		<div className={`frame-left absolute ${theme === "light" ? "border-black" : "border-white"}`}></div>
			    		<img className= "image-left relative" src={photo} alt="Allée de baobabs à Madagascar"/>
			    	</div>
			    	<div className="div-right">
						<h1 className="title">Arno Cotsoyannis</h1>
						<h2 className='sub-title'>{translate(lang).main.part1.subTitle}</h2>
			    		<ul className="nav-links flex justify-center align-center no-bullet relative">
			    			<li className="link-1 absolute"><a href="https://github.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer"><img className="border-cercle" src={github} alt="lien github"/></a></li>
			    			<li className="link-2 absolute"><a href="https://www.instagram.com/avir.karakitsos" target="_blank" rel="noopener noreferrer"><img className="border-cercle" src={instagram} alt="lien instagram"/></a></li>
			    			<li className="link-3 absolute"><a href="https://twitter.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer"><img className="border-cercle" src={twitter} alt="lien twitter"/></a></li>
			    			<li className="link-4 absolute"><img className="border-cercle" onClick={() => alert('avir.karakitsos@gmail.com')} src={gmail} alt="email"/></li>
			    		</ul>
			    	</div>
			    </section>

				<About/>

				<Skills/>
				
				<Modal modal={modal} setModal={setModal}/>

				<section id="project" className="section-1 flex">
					<h2 className="text-center">Mes projets</h2>
					<ul className="list flex align-center justify-center no-bullet cursor-default">
						<li className='btn bg-green' onClick={() => handleFilter("all")}>{translate(lang).main.projects.all}</li>
						<li className='btn bg-green-opacity' onClick={() => handleFilter("openclassrooms")}>{translate(lang).main.projects.openclassrooms}</li>
						<li className='btn bg-green-opacity' onClick={() => handleFilter("perso")}>{translate(lang).main.projects.personal}</li>
					</ul>
				</section>

				<div className="box-container cursor-default">
					{ filter ?
					table.map(project => <Card key={project._id} project={project} setModal={setModal}/>)
					: projects.map(project => <Card key={project._id} project={project} setModal={setModal}/>)
					}
				</div>
            </main>
        </Layout>
    )
}

export default Home