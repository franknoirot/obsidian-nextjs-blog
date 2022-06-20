import { Project } from "contentlayer/generated";
import Link from "next/link";

export default function ProjectCard(project: Project) {
    return (
      <div className="mb-6">
        <h2 className="text-lg">
          <Link href={project.url}>
            <a className="text-blue-700 hover:text-blue-900">{project.title}</a>
          </Link>
        </h2>
        <time dateTime={(project.created).toString()} className="block text-sm text-slate-600">
          Started: {project.created}
        </time>
        <time dateTime={(project.updated).toString()} className="block text-sm text-slate-600">
          Last Updated: {project.updated}
        </time>
      </div>
    )
}