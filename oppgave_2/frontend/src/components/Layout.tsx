"use client";


import { useState, type PropsWithChildren } from "react";
import { LayoutProps } from "../../.next/types/app/layout";
import { Navigation } from "./Navigation";


export default function Layout(props: LayoutProps) {
    const {children} = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = (isLoggedIn: boolean) =>  {
        setIsLoggedIn(isLoggedIn)
    }
    return(
        <>
        <header>
            <Navigation />
        </header>
        <main className="container">
            {children}
        </main>
        
        </>
    )
}