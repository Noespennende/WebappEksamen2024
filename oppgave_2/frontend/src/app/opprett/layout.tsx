import React from 'react';
import Link from 'next/link';

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav id="createOccasionandTemplateNavigation">
                <Link href="/opprett/arrangement">
                    <button className='button'>Opprett Arrangement</button>
                </Link>
                <Link href="/opprett/mal">
                    <button className='button'>Opprett Mal</button>
                </Link>
            </nav>
            <main>{children}</main>
        </div>
    );
}