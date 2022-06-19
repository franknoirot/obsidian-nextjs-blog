import { Post } from "contentlayer/generated";
import { format, parseISO } from 'date-fns'
import Link from "next/link";

export default function PostCard(post: Post) {
    return (
      <div className="mb-6">
        <h2 className="text-lg">
          <Link href={post.url}>
            <a className="text-blue-700 hover:text-blue-900">{post.title}</a>
          </Link>
        </h2>
        <time dateTime={post.published} className="block text-sm text-slate-600">
          {format(parseISO(post.published), 'LLLL d, yyyy')}
        </time>
      </div>
    )
}