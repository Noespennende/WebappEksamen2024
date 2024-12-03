"use client";
import Link from "next/link";
import logo from "../../public/images/logo.png"
import { useEffect, useState } from "react";

export function Navigation() {

    const LoggedIn = localStorage.getItem("adminLoggedIn")

    useEffect(() => {
      }, [LoggedIn]);
    
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
                   {LoggedIn ?  "Admin log ut" : "Admin login"}
            </Link>
            
        </nav>
    )
}