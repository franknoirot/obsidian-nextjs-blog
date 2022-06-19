import { Book } from "contentlayer/generated";
import Link from "next/link";

export default function BookCard(book: Book) {
    return (
      <div className="mb-6">
        <h2 className="text-lg">
          <Link href={book.url}>
            <a className="text-blue-700 hover:text-blue-900">{book.title}</a>
          </Link>
        </h2>
        <time dateTime={(book.publishDate || book.originallyPublished).toString()} className="block text-sm text-slate-600">
          {book.publishDate}
        </time>
      </div>
    )
}