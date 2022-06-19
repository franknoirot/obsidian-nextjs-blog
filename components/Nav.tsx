import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

type NavLink = {
    label: string,
    href: string,
}

interface INavProps {
    navLinks: NavLink[],
}

const Nav: React.FC<INavProps> = ({ navLinks }) => {
    const getCurrentClasses = (slug: string) => (useRouter().route.includes(slug))
        ? 'text-blue-400'
        : ''

    return <nav className="">
        <Link href="/">
            <a>
                <Image src="/logomark.svg" width="39" height="57" objectFit="contain" alt="Frank Noirot Home" />
            </a>
        </Link>
        <ul>
            { navLinks.map(page => (
                <li key={page.href}>
                    <Link href={page.href}>
                        <a className={getCurrentClasses(page.href)}>
                            { page.label }
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
}

export default Nav