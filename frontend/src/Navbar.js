export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">
            Reittiopas
            </a>
            <ul>
                <li className="active">
                    <a href="/reitit"> Reitit</a>
                </li>
                <li>
                    <a href="/kirjautuminen">Kirjaudu</a>
                </li>
            </ul>
        
        </nav>
    )
}