import styles from '../assets/styles/Home.module.css'
import photo from '../assets/images/photo-baobab.png'
import github from '../assets/images/github.png'
import twitter from '../assets/images/x-logo.jpg'
import instagram from '../assets/images/insta.png'
import gmail from '../assets/images/gmail.png'

import Layout from "../Components/layouts/Layout"
import Card from '../Components/Card'
import Modal from '../Components/Modal'
import Skills from '../Components/Skills'
import About from '../Components/About'
import Category from '../Components/Category'

import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../utils/context/ThemeContext'
import { LanguageContext } from '../utils/context/LanguageContext'
import { changeColor, translate } from '../utils/common'
import { getRequest } from '../utils/request'

function Home() {
	const {theme} = useContext(ThemeContext)
	const {lang, toggleLanguage} = useContext(LanguageContext)

	const [projects, setProjects] = useState([])
	const [modal, setModal] = useState("")
	const [table, setTable] = useState([])
	const [allCategories, setAllCategories] = useState(null)

	const callback = function(data) {
		setProjects(data)
		setTable(data)
	}

	useEffect(() => {
		getRequest("projects",callback)
	 }, [])

	 useEffect(() => {
		getRequest("categories",setAllCategories)
	 }, [])

	useEffect(() => {
		toggleLanguage(window.location.pathname.substring(1))
	 }, [toggleLanguage])

	 const handleFilter = function(tag) {
		if(tag === "all") {
			setTable(projects)
		}
		else {
			let copy = [...projects]
			let filter = copy?.filter(element => element.category === tag)
			setTable(filter)
		}
		changeColor(tag)
	}
	
    return (
        <Layout>
            <main className={styles["main-container"]}>
                <section className={styles["top-container"]}>
			    	<div className="relative">
			    		<div className={`${styles["frame-left"]} absolute ${theme === "light" ? "border-black" : "border-white"}`}></div>
			    		<img className= {`${styles["image-left"]} relative`}  src={photo} alt="Allée de baobabs à Madagascar"/>
			    	</div>
			    	<div className={styles["div-right"]}>
						<h1 className={styles["title"]}>Arno Cotsoyannis</h1>
						<h2 className={styles.subtitle}>{translate(lang).main.part1.subtitle}</h2>
			    		<ul className={`${styles["links-container"]} no-bullet relative`}>
			    			<li className={`${styles["link-1"]} absolute`}><a href="https://github.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer"><img height={30} width={30} className="border-cercle" src={github} alt="lien github"/></a></li>
			    			<li className={`${styles["link-2"]} absolute`}><a href="https://www.instagram.com/avir.karakitsos" target="_blank" rel="noopener noreferrer"><img height={30} width={30} className="border-cercle" src={instagram} alt="lien instagram"/></a></li>
			    			<li className={`${styles["link-3"]} absolute`}><a href="https://twitter.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer"><img height={30} width={30} className="border-cercle" src={twitter} alt="lien twitter"/></a></li>
			    			<li className={`${styles["link-4"]} absolute`}><img height={30} width={30} className="border-cercle" onClick={() => alert('arnocotso8@gmail.com')} src={gmail} alt="email"/></li>
			    		</ul>
			    	</div>
			    </section>

				<About/>

				<Skills/>
				
				<Modal modal={modal} setModal={setModal}/>

				<section id="project" className="section-1 flex direction-column medium-row-gap">
					<h2 className="text-center">{translate(lang).main.projects.subtitle}</h2>
					<ul className={styles["project-filter"]}>
						<li 
							data-tag="all" 
							className="list-filter" 
							onClick={() => handleFilter("all")}
							>
							<button className="btn-filter btn bg-green no-border">{translate(lang).main.projects.all}</button>
						</li>
						{ allCategories?.map( category => <Category category={category} handleFilter={handleFilter} key={category._id}/>) }
					</ul>
				</section>

				<div className={styles["box-container"]}>
					{ table.map(project => <Card key={project._id} project={project} setModal={setModal}/>) }
				</div>
            </main>
        </Layout>
    )
}

export default Home