import Link from "next/link";


export default function Navigation() {

    return (
        <>
            <nav className="mt-6 mb-12 flex justify-between">
                <h1 className="text-lg font-bold uppercase" data-testid="logo">
                <a href="/">Mikro LMS</a>
                </h1>
                <ul className="flex gap-8" data-testid="nav">
                <li className="text-base font-semibold" data-testid="nav_courses">
                    <Link href={`/courses`}>Kurs</Link>
                </li>
                <li className="text-base font-semibold" data-testid="nav_new">
                <Link href={`/courses/create`}>Nytt kurs</Link>
                </li>
                </ul>
            </nav>
        </>
    )
}