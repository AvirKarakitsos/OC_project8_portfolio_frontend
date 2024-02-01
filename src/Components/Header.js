import styles from '../assets/styles/Header.module.css'
import logo1 from '../assets/images/logo-light.png'
import logo2 from '../assets/images/logo-dark.png'
import CV from "../assets/files/CV_Arno_Cotsoyannis.pdf"
import { useContext, useState } from 'react'
import { ThemeContext } from '../utils/context/ThemeContext'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../utils/context/LanguageContext'
import { translate } from '../utils/common'

function Header() {
	const {theme, toggleTheme} = useContext(ThemeContext)
	const {lang, toggleLanguage} = useContext(LanguageContext)
	const [open, setOpen] = useState(false)
	
	// const handleSidebar = function () {
	// 	const sideBar = document.querySelector(`.${styles.anchor}`)
	// 	if(!open) {
	// 		sideBar.classList.add(`${styles.slide}`)
	// 		setOpen(true)
	// 	} else {
	// 		sideBar.classList.remove(`${styles.slide}`)
	// 		setOpen(false)
	// 	}
	// }

    return (
        <header className={`${styles.header} ${theme === "light" ? "bg-light-1" : "bg-darker-2"}`}>
			{theme === "light"
				? <img className="size-50" src={logo1} alt="logo"/>
				: <img className="size-50" src={logo2} alt="logo"/>
			}
			<nav className="relative flex justify-space small-column-gap cursor-default">
				<ul className={open 
					? `${styles.anchor} flex-row-to-column align-center justify-center small-column-gap no-bullet ${theme === "light" ? "bg-light-1" : "bg-darker-2"}`
					: `${styles.anchor} ${styles.slide} flex-row-to-column align-center justify-center small-column-gap no-bullet ${theme === "light" ? "bg-light-1" : "bg-darker-2"}`}> 
					<li><a className='no-decoration' href={CV} target='_blank' rel="noreferrer">CV</a></li>
					<li><a className="no-decoration" href='#about-me'>{translate(lang).header.about}</a></li>
					<li><a className="no-decoration" href='#project'>{translate(lang).header.projects}</a></li>
					<li><a className="no-decoration" href='#footer'>Contact</a></li>
					<li><Link className="no-decoration" to={localStorage.getItem("userId") ? "/admin" : "/login"}>{translate(lang).header.login}</Link></li>
				</ul>
				
				<ul className={`flex align-center justify-center no-bullet`}>
					<li className={`${styles["list-lang"]} ${lang === "fr" ? "border-blue" : ""}`} onClick={() => toggleLanguage("fr")}><button className="no-border">FR</button></li>
					<li className={`${styles["list-lang"]} ${lang === "en" ? "border-blue" : ""}`} onClick={() => toggleLanguage("en")}><button className="no-border">EN</button></li>
				</ul>
				<ul className="flex align-center no-bullet small-column-gap">
					{theme === "light"
						? <li><button  onClick={() => toggleTheme("dark")} className="no-border flex align-center tiny-column-gap btn bg-dark font-size-normal"><i className="fa-regular fa-moon color-white"></i>{translate(lang).header.mode}</button></li>
						: <li><button onClick={() => toggleTheme("light")}  className="no-border flex align-center tiny-column-gap btn bg-light-1 color-black font-size-normal"><i className="fa-solid fa-sun color-black"></i>{translate(lang).header.mode}</button></li>
					}
					<li>
						<button
							className='no-border display-dynamic size-32 flex justify-center align-center border-cercle bg-dark'
							onClick={() => setOpen((value) => !value)}
						>
							<i className="fa-solid fa-bars"></i>
						</button>
					</li>
				</ul>
			</nav>
        </header>
    )
}

export default Header