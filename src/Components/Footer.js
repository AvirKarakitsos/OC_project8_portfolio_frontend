import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../utils/context/ThemeContext"
import { LanguageContext } from '../utils/context/LanguageContext'
import { translate } from '../utils/common'

function Footer() {
	const {theme} = useContext(ThemeContext)
	const {lang} = useContext(LanguageContext)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    //Assign the good strings depending on the viewport
    useEffect(() => {
        window.addEventListener("resize",()=> {
            setWindowWidth(window.innerWidth)
        })
    },[])

    return(
        <footer id="footer" className={`section-3 flex direction-column align-center justify-center medium-row-gap-2 border-top-grey cursor-default  ${theme === "light" ? "" : "bg-darker-2"}`}>
			<p className="footer-contact">{translate(lang).footer.contact} : arnocotso8@gmail.com</p>
			<ul className="flex small-column-gap no-bullet">
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://github.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">github</a></li>
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://twitter.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">twitter</a></li>
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://www.instagram.com/avir.karakitsos" target="_blank" rel="noopener noreferrer">instagram</a></li>
			</ul>
			{windowWidth <= 750 ?
			<>
				<p>Arno Cotsoyannis</p>
				<p>{translate(lang).footer.subtitle}</p>
			</>
			: <p>Arno Cotsoyannis | {translate(lang).footer.subtitle}</p>
			}
		</footer>
    )
}

export default Footer