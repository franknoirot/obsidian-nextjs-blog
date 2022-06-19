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

const socialLinks = [
    {
        label: 'Instagram',
        href: 'https://instagram.com/franknoirot',
        icon: 'instagram.svg',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/frank-johnson-noirot',
        icon: 'linkedin.svg',
    },
    {
        label: 'Twitter',
        href: 'https://twitter.com/frank_noirot',
        icon: 'twitter.svg',
    },
]

const Nav: React.FC<INavProps> = ({ navLinks }) => {
    const getCurrentClasses = (slug: string) => (useRouter().route.includes(slug))
        ? 'text-blue-800 bg-blue-100'
        : ''

    return <nav className="sticky grid max-w-md grid-rows-2 mx-12 my-6 top-4 gap-x-4" style={{gridTemplateColumns: 'auto 1fr'}}>
        <Link href="/">
            <a className="row-span-2">
                <Image src="/logomark.svg" width="39" height="57" objectFit="contain" alt="Frank Noirot Home" />
            </a>
        </Link>
        <ul className="flex col-start-2 gap-2">
            { navLinks.map(page => (
                <li key={page.href}>
                    <Link href={page.href}>
                        <a className={'px-2 py-1 rounded-sm ' + getCurrentClasses(page.href)}>
                            { page.label }
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
        <ul className="flex col-start-2 gap-4 px-2">
            { socialLinks.map(page => (
                <li key={page.href}>
                    <Link href={page.href}>
                        <a className={"text-gray-400"} target="_blank" rel="nofollower noopener">
                            <Image src={'/' + page.icon} alt={page.label} width={16} height={16} objectFit="cover" />
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
}

export default Nav