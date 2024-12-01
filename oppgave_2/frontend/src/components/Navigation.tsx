import Link from "next/link";
import logo from "../../public/images/logo.png"

export function Navigation() {

    return (
        <nav>
            <div id="logoAndHomeButton">
            <Link href="/" id="logo">
                <img  src="/images/logo.png"></img>
            </Link>
            <Link href="/" className="navButton">
                Hjem
            </Link>
            </div>
            
            <Link href="/" className="navButton">
                    Admin login
            </Link>
            
        </nav>
    )
}