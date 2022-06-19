import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    published: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    category: {
      type: 'enum',
      options: ['technology', 'culture', 'seedlings'],
      default: 'technology',
      description: `The area of interest of this piece. "Seedlings" are rough thoughts that aren't fully formed yet.`,
    },
    description: {
      type: 'string',
      description: 'The metadata description of the post',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.sourceFileName.slice(0, post._raw.sourceFileName.lastIndexOf( '.'))}`,
    },
  },
}))

export const Book = defineDocumentType(() => ({
    name: 'Book',
    filePathPattern: `books/**/*.md`,
    fields: {
        title: {
            type: 'string',
            description: 'Title of the book',
            required: true,
        },
        author: {
            type: 'string',
            description: 'Author of the book. For now also list any other authors here',
            required: true,
        },
        originallyPublished: {
            type: 'number',
            description: 'Year of first publication',
            required: true,
        },
        publishDate: {
            type: 'number',
            description: 'Year of owned published copy',
            required: false,
        },
        format: {
            type: 'string',
            description: 'Format of publication, usually "printed" or "digital"',
            default: 'printed',
        },
        coverImg: {
            type: 'string',
            description: 'Filename and extension of cover image within _assets folder',
            required: true,
        },
    },
    computedFields: {
        url: {
          type: 'string',
          resolve: (book) => `/books/${book._raw.sourceFileName.slice(0, book._raw.sourceFileName.lastIndexOf('.'))}`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'vault',
    contentDirExclude: [
      'private',
      'templates',
      '_assets',
    ],
    documentTypes: [
        Post,
        Book,
    ],
})
