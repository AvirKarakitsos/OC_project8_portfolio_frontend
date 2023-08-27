import logo from '../assets/images/logo-light.png'
import styles from '../assets/styles/Header.module.css'
import { useContext } from 'react'
import { ThemeContext } from '../utils/context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../utils/context/LanguageContext'
import { translate } from '../utils/common'

function Header() {
	const {theme, toggleTheme} = useContext(ThemeContext)
	const {lang, toggleLanguage} = useContext(LanguageContext)
	const navigate = useNavigate()
	let isOpen = false

	const handleSidebar = function () {
		const sideBar = document.querySelector(`.${styles.anchor}`)
		if(!isOpen) {
			sideBar.classList.add(`${styles.slide}`)
			isOpen = true
		} else {
			sideBar.classList.remove(`${styles.slide}`)
			isOpen = false
		}
	}

	const handleLanguage = function(input) {
		toggleLanguage(input)
		navigate(`/${input}`)
	}

    return (
        <header className={`header flex justify-space align-center ${theme === "light" ? "bg-light-1" : "darker-2"}`}>
            <img className="size-32" src={logo} alt="logo"/>
			<nav className="relative flex justify-space small-column-gap cursor-default">
				<ul className={`${styles.anchor} flex-row-to-column align-center justify-center small-column-gap no-bullet`}>
					<li><a className={`no-decoration ${theme === "light" ? "color-black" : "color-white"}`} href='#about-me'>{translate(lang).header.about}</a></li>
					<li><a className={`no-decoration ${theme === "light" ? "color-black" : "color-white"}`} href='#project'>{translate(lang).header.projects}</a></li>
					<li><a className={`no-decoration ${theme === "light" ? "color-black" : "color-white"}`} href='#footer'>Contact</a></li>
				</ul>
				
				<ul className={`flex align-center justify-center no-bullet`}>
					<li className={`flex btn-lang size-32 ${lang === "fr" ? "border-blue" : ""}`} onClick={() => handleLanguage("fr")}>FR</li>
					<li className={`flex btn-lang size-32 ${lang === "en" ? "border-blue" : ""}`} onClick={() => handleLanguage("en")}>EN</li>
				</ul>
				<ul className="flex align-center no-bullet small-column-gap">
					{theme === "light"
						? <li className="btn dark" onClick={() => toggleTheme("dark")}>{translate(lang).header.darkMode}</li>
						: <li className="btn bg-light-1 color-black" onClick={() => toggleTheme("light")}>{translate(lang).header.lightMode}</li>
					}
				
					<li 
						className='display-dynamic size-32 flex justify-center align-center border-cercle border-grey'
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