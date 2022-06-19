import Nav from "components/Nav"
import { PropsWithChildren } from "react"


const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const navLinks = [
      { label: 'Writing', href: '/posts' },
      { label: 'Library', href: '/books' },
    ]
    return (<>
      <Nav navLinks={navLinks} />
      <main>{ children }</main>
    </>)
}

export default BaseLayout