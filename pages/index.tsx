import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allPosts, Post, allBooks, Book, allProjects, Project } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import PostCard from 'components/PostCard'
import BookCard from 'components/BookCard'
import ProjectCard from 'components/ProjectCard'

export async function getStaticProps() {
  const byDescLastUpdated = (a: Post | Project, b: Post | Project) => {
    return compareDesc(new Date(a.updated), new Date(b.updated))
  }

  const posts = allPosts.sort(byDescLastUpdated)
  const projects = allProjects.sort(byDescLastUpdated)

  const books = allBooks.sort((a, b) => a.title > b.title ? 1 : -1)
  return { props: { posts, books, projects } }
}

interface IHomeProps { posts: Post[], books: Book[], projects: Project[] }

const Home: NextPageWithLayout = (props) => {
  const { posts, books, projects } = props as IHomeProps
  
  return (
    <div className="max-w-2xl py-16 mx-auto text-center">
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1 className="mb-8 text-3xl font-bold">Contentlayer Blog Example</h1>

      <h2>Posts</h2>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
      <hr className='my-8' />
      <h2>Books</h2>
      {books.map((book, idx) => (
        <BookCard key={'book-'+idx} {...book} />
      ))}
      <hr className='my-8' />
      <h2>Projects</h2>
      {projects.map((project, idx) => (
        <ProjectCard key={'project-'+idx} {...project} />
      ))}
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default Home