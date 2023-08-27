import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../utils/context/ThemeContext"

function Footer() {
	const {theme} = useContext(ThemeContext)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    //Assign the good strings depending on the viewport
    useEffect(() => {
        window.addEventListener("resize",()=> {
            setWindowWidth(window.innerWidth)
        })
    },[])

    return(
        <footer id="footer" className={`footer flex align-center justify-center cursor-default  ${theme === "light" ? "" : "darker-2"}`}>
			<p className="footer-contact">Me contacter: arnocotso8@gmail.com</p>
			<ul className="flex small-column-gap no-bullet">
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://github.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">github</a></li>
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://twitter.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">twitter</a></li>
				<li><a className={theme === "light" ? "color-black" : "color-white"} href="https://www.instagram.com/avir.karakitsos" target="_blank" rel="noopener noreferrer">instagram</a></li>
			</ul>
			{windowWidth <= 750 ?
			<>
				<p>Arno Cotsoyannis</p>
				<p>Site réalisé avec React et Node JS</p>
			</>
			: <p>Arno Cotsoyannis | Site réalisé avec React et Node JS</p>
			}
		</footer>
    )
}

export default Footer