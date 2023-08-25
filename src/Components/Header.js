import { useState, useEffect } from 'react'
import logo from '../assets/images/logo-light.png'

function Header() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [navbar, setNavbar] = useState(false)

	useEffect(() => {
        window.addEventListener("resize",()=> {
            setWindowWidth(window.innerWidth)
        })
        if(windowWidth <= 650) setNavbar(true) 
		else setNavbar(false)
    },[windowWidth])

    return (
        <header className="header flex justify-space align-center">
            <img className="size-32" src={logo} alt="logo"/>
			<nav className="flex justify-space small-column-gap cursor-default">
				{!navbar &&	
				<ul className="flex align-center justify-center small-column-gap no-bullet">
					<li><a className="no-decoration color-black" href='#about-me'>A Propos</a></li>
					<li><a className="no-decoration color-black" href='#project'>Projets</a></li>
					<li><a className="no-decoration color-black" href='#footer'>Contact</a></li>
				</ul>
				}
				<ul className="flex align-center justify-center no-bullet">
					<li className="flex btn-lang size-32 border-blue">FR</li>
					<li className="flex btn-lang size-32">EN</li>
				</ul>
				<ul className="flex align-center no-bullet small-column-gap">
					<li className="btn dark dark">Dark Mode</li>
					<li className="btn dark light none">Light Mode</li>
				
				{navbar &&
					<li className='size-32 flex justify-center align-center border-cercle border-grey'>
						<i className="fa-solid fa-bars"></i>
					</li>
				}
				</ul>
			</nav>
        </header>
    )
}

export default Header