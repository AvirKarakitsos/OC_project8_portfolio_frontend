import styles from '../assets/styles/Footer.module.css'
import background from '../assets/images/footer-bg.jpg'
import smallUrl from '../assets/images/footer-bg-small.jpg'
import { useContext } from "react"
import { ThemeContext } from "../utils/context/ThemeContext"
import { LanguageContext } from '../utils/context/LanguageContext'
import { translate } from '../utils/common'

function Footer() {
	const {theme} = useContext(ThemeContext)
	const {lang} = useContext(LanguageContext)

    return(
        <footer id="footer" className={`${styles.section}  ${theme === "light" ? "" : "bg-darker-2"}`}>
        {/* <footer id="footer" className={`${styles.section}`}> */}
			<p className="footer-contact">{translate(lang).footer.contact} : arnocotso8@gmail.com</p>
			<ul className="flex small-column-gap no-bullet">
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://github.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">github</a></li>
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://twitter.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">twitter/X</a></li>
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://www.instagram.com/avir.karakitsos" target="_blank" rel="noopener noreferrer">instagram</a></li>
			</ul>
			<picture>
                    <source media="(max-width: 750px)" srcSet={smallUrl}/>
                    <img className={`${styles.image} ${theme === "light" ? styles.light : styles.black}`} src={background} alt='paysage avec un voilier'/>
                </picture>
		</footer>
    )
}

export default Footer