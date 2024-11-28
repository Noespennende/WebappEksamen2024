import type { PropsWithChildren } from "react";
import { LayoutProps } from "../../.next/types/app/layout";
import { Navigation } from "./Navigation";

export default function Layout(props: LayoutProps) {
    const {children} = props;

    return(
        <>
        <header>
            <Navigation/>
        </header>
        <main className="container">
            {children}
        </main>
        
        </>
    )
}