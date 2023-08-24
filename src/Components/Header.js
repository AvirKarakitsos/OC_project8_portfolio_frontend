import logo from '../assets/images/logo-light.png'

function Header() {
    return (
        <header className="header flex justify-space align-center">
            <img className="size-32" src={logo} alt="logo"/>
			<nav className="flex justify-space column-gap-15 cursor-default">
				<ul className="flex align-center justify-center column-gap-15 no-bullet">
					<li><a className="no-decoration link-black" href='#about-me'>A Propos</a></li>
					<li><a className="no-decoration link-black" href='#project'>Projets</a></li>
					<li><a className="no-decoration link-black" href='#footer'>Contact</a></li>
				</ul>
				<ul className="flex align-center justify-center no-bullet">
					<li className="flex btn-lang size-32 border-blue">FR</li>
					<li className="flex btn-lang size-32">EN</li>
				</ul>
				<ul className="flex-align-center no-bullet">
					<li className="btn-dark dark">Dark Mode</li>
					<li className="btn-dark light none">Light Mode</li>
				</ul>
			</nav>
        </header>
    )
}

export default Header