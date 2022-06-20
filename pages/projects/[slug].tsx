import Head from 'next/head'
import { allProjects, Project } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { parseObsidianLinks } from 'lib/markdown'
import ReactMarkdown from 'react-markdown'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import { ParsedUrlQuery } from 'querystring'

export async function getStaticPaths() {
  const paths = allProjects.map((project) => project.url)
  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async(context) => {
  const { slug } = context.params as IParams
  const project = allProjects.find((project) => project._raw.sourceFileName.includes(slug)) as Project
  const projectBody = parseObsidianLinks(project.body.raw)

  return {
    props: {
      project,
      projectBody,
    },
  }
}

interface IProjectProps { project: Project, projectBody: string }

const ProjectTemplate: NextPageWithLayout = (props) => {
  const { project, projectBody } = props as IProjectProps
  
  return (
    <>
      <Head>
        <title>{project.title} | franknoirot.co</title>
      </Head>
      <article className="max-w-2xl py-16 mx-auto">
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{project.title}</h1>
          <p>for {project.organization}</p>
          <p>my role was {project.role}</p>
          <time dateTime={(project.created).toString()} className="block text-sm text-slate-600">
            Started: {project.created}
          </time>
          <time dateTime={(project.updated).toString()} className="block text-sm text-slate-600">
            Last Updated: {project.updated}
          </time>
        </div>
        <div className="cl-project-body">
          <ReactMarkdown>
            {projectBody}
          </ReactMarkdown>
        </div>
      </article>
    </>
  )
}

ProjectTemplate.getLayout = function getLayout(page: ReactElement) {
  return (
      <BaseLayout>
        { page }
      </BaseLayout>
  )
}

export default ProjectTemplate
