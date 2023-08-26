import { useEffect, useState } from "react"

function Footer() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    //Assign the good strings depending on the viewport
    useEffect(() => {
        window.addEventListener("resize",()=> {
            setWindowWidth(window.innerWidth)
        })
    },[])

    return(
        <footer id="footer" className="footer flex align-center justify-center cursor-default">
			<p className="footer-contact">Me contacter: arnocotso8@gmail.com</p>
			<ul className="flex small-column-gap no-bullet">
				<li><a className="color-black" href="https://github.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">github</a></li>
				<li><a className="color-black" href="https://twitter.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">twitter</a></li>
				<li><a className="color-black" href="https://www.instagram.com/avir.karakitsos" target="_blank" rel="noopener noreferrer">instagram</a></li>
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