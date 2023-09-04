import styles from '../assets/styles/Header.module.css'
import logo1 from '../assets/images/logo-light.png'
import logo2 from '../assets/images/logo-dark.png'
import { useContext, useState } from 'react'
import { ThemeContext } from '../utils/context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../utils/context/LanguageContext'
import { translate } from '../utils/common'

function Header() {
	const {theme, toggleTheme} = useContext(ThemeContext)
	const {lang, toggleLanguage} = useContext(LanguageContext)
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()
	
	const handleSidebar = function () {
		const sideBar = document.querySelector(`.${styles.anchor}`)
		if(!open) {
			sideBar.classList.add(`${styles.slide}`)
			setOpen(true)
		} else {
			sideBar.classList.remove(`${styles.slide}`)
			setOpen(false)
		}
	}

	const handleLanguage = function(input) {
		toggleLanguage(input)
		navigate(`/${input}`)
	}

    return (
        <header className={`${styles.header} ${theme === "light" ? "bg-light-1" : "bg-darker-2"}`}>
			{theme === "light"
				? <img className="size-50" src={logo1} alt="logo"/>
				: <img className="size-50" src={logo2} alt="logo"/>
			}
			<nav className="relative flex justify-space small-column-gap cursor-default">
				<ul className={`${styles.anchor} flex-row-to-column align-center justify-center small-column-gap no-bullet ${theme === "light" ? "bg-light-1" : "bg-darker-2"}`}>
					<li><a className={`no-decoration ${theme === "light" ? "color-black" : "color-white"}`} href='#about-me'>{translate(lang).header.about}</a></li>
					<li><a className={`no-decoration ${theme === "light" ? "color-black" : "color-white"}`} href='#project'>{translate(lang).header.projects}</a></li>
					<li><a className={`no-decoration ${theme === "light" ? "color-black" : "color-white"}`} href='#footer'>Contact</a></li>
				</ul>
				
				<ul className={`flex align-center justify-center no-bullet`}>
					<li className={`flex btn-2 size-32 ${lang === "fr" ? "border-blue" : ""}`} onClick={() => handleLanguage("fr")}>FR</li>
					<li className={`flex btn-2 size-32 ${lang === "en" ? "border-blue" : ""}`} onClick={() => handleLanguage("en")}>EN</li>
				</ul>
				<ul className="flex align-center no-bullet small-column-gap">
					{theme === "light"
						? <li className="flex align-center tiny-column-gap btn bg-dark" onClick={() => toggleTheme("dark")}><i className="fa-regular fa-moon color-white"></i>{translate(lang).header.mode}</li>
						: <li className="flex align-center tiny-column-gap btn bg-light-1 color-black" onClick={() => toggleTheme("light")}><i className="fa-solid fa-sun color-black"></i>{translate(lang).header.mode}</li>
					}
				
					<li 
						className='display-dynamic size-32 flex justify-center align-center border-cercle border-bottom-grey'
						onClick={handleSidebar}
					>
						<i className="fa-solid fa-bars"></i>
					</li>
				</ul>
			</nav>
        </header>
    )
}

export default Header