import { Project } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default function ProjectCard(project: Project) {
    return (
      <div className="mb-6">
        <h2 className="text-lg">
          <Link href={project.url}>
            <a className="text-blue-700 hover:text-blue-900">{project.title}</a>
          </Link>
        </h2>
        <time dateTime={project.created} className="block text-sm text-slate-600">
          Started {format(parseISO(project.created), 'LLLL d, yyyy')}
        </time>
        <time dateTime={project.updated} className="block text-sm text-slate-600">
          Last Updated {format(parseISO(project.updated), 'LLLL d, yyyy')}
        </time>
      </div>
    )
}