
function Footer() {
    return(
        <footer id="footer" className="footer flex align-center justify-center cursor-default">
			<p className="footer-contact">Me contacter: arnocotso8@gmail.com</p>
			<ul className="flex column-gap-15 no-bullet">
				<li><a className="link-black" href="https://github.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">github</a></li>
				<li><a className="link-black" href="https://twitter.com/AvirKarakitsos" target="_blank" rel="noopener noreferrer">twitter</a></li>
				<li><a className="link-black" href="https://www.instagram.com/avir.karakitsos" target="_blank" rel="noopener noreferrer">instagram</a></li>
			</ul>
			<p>Arno Cotsoyannis | Site réalisé avec React et Node JS</p>
		</footer>
    )
}

export default Footer