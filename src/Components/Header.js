import logo from '../assets/images/logo-light.png'
import styles from '../assets/styles/Header.module.css'

function Header() {
	let isOpen = false
	const handleSidebar = function () {
		const sideBar = document.querySelector(`.${styles.anchor}`)
		if(!isOpen) {
			sideBar.classList.add(`${styles.slide}`)
			// sideBar.style.display = "flex"
			isOpen = true
		} else {
			sideBar.classList.remove(`${styles.slide}`)
			// sideBar.style.display = "none"
			isOpen = false
		}
	}

    return (
        <header className="header flex justify-space align-center">
            <img className="size-32" src={logo} alt="logo"/>
			<nav className="relative flex justify-space small-column-gap cursor-default">
				<ul className={styles.anchor+" flex-row-to-column align-center justify-center small-column-gap no-bullet"}>
					<li><a className="no-decoration color-black" href='#about-me'>A Propos</a></li>
					<li><a className="no-decoration color-black" href='#project'>Projets</a></li>
					<li><a className="no-decoration color-black" href='#footer'>Contact</a></li>
				</ul>
				
				<ul className="flex align-center justify-center no-bullet">
					<li className="flex btn-lang size-32 border-blue">FR</li>
					<li className="flex btn-lang size-32">EN</li>
				</ul>
				<ul className="flex align-center no-bullet small-column-gap">
					<li className="btn dark dark">Dark Mode</li>
					<li className="btn dark light none">Light Mode</li>
				
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