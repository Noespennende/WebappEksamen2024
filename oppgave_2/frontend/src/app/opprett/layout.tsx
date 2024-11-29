import React from 'react';
import Link from 'next/link';

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav>
                <Link href="/opprett/arrangement">
                    <button>Opprett Arrangement</button>
                </Link>
                <Link href="/opprett/mal">
                    <button>Opprett Mal</button>
                </Link>
            </nav>
            <main>{children}</main>
        </div>
    );
}