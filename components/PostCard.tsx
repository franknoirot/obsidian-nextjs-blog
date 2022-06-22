import { Post } from "contentlayer/generated";
import { format, parseISO } from 'date-fns'
import Link from "next/link";

export default function PostCard(post: Post, headingLevel = 3) {

    return (
    <Link href={post.url}><a className="p-2 transition-colors rounded group hover:bg-green-50">
      <div className="">
        <h3 className="mt-0 text-lg font-normal group-hover:text-green-900 first-letter:capitalize">{post.title}</h3>
        <p className="text-sm">
            <span className="inline-block mr-2 text-green-800 capitalize">{ post.growthStage }</span>
            <time dateTime={post.updated} className="text-sm text-slate-600">
            Last tended {format(parseISO(post.updated), 'LLLL d, yyyy')}
            </time>
        </p>
      </div>
    </a></Link>
    )
}