import { NowUpdate } from "contentlayer/generated";
import ReactMarkdown from "react-markdown";

export default function UpdateCard(update: NowUpdate) {
  const updateDate = update._raw.sourceFileName.slice(0, update._raw.sourceFileName.lastIndexOf('.'))

  return (
    <div className="mb-6">
      <h2 className="text-lg">
        <time dateTime={updateDate}>
          {updateDate}
        </time>
      </h2>
      <small>
        {update.title}
      </small>
      <ReactMarkdown>{ update.body.raw }</ReactMarkdown>
    </div>
  )
}