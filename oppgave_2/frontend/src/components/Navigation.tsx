'use client';
import Link from "next/link";
import logo from "../../public/images/logo.png"
import { useEffect, useState } from "react";



export function Navigation() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        const storedAdminStatus = localStorage.getItem("adminLoggedIn");
        if (storedAdminStatus === "true") {
          setIsAdminLoggedIn(true);
        }
      }, []);

      const toggleAdminLogin = () => {
        if (isAdminLoggedIn) {
          localStorage.removeItem("adminLoggedIn");
          setIsAdminLoggedIn(false);
        } else {
          localStorage.setItem("adminLoggedIn", "true");
          setIsAdminLoggedIn(true);
        }
        window.location.reload();
      };

      
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
            
            <button onClick={toggleAdminLogin} className="navButton">
                {isAdminLoggedIn ? "Admin logout" : "Admin login"}
            </button>
            
        </nav>
    )
}