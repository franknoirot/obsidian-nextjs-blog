import { Book } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function BookCard(book: Book) {
    return (
    <Link href={book.url}><a className="group">
      <div className="mb-6 text-left">
        <Image src={'/assets/'+book.coverImg} alt={book.title} width={180} height={240} objectFit="contain"/>
        <h2 className="text-lg font-normal group-hover:text-blue-600">{book.title}</h2>
        <p className="text-sm">by { book.author }</p>
      </div>
    </a></Link>
    )
}