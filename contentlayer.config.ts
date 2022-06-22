import remarkFootnotes from 'remark-footnotes'
import remarkPrism from 'remark-prism'
import remarkExternalLinks from 'remark-external-links'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
// import { parseObsidianLinks } from './lib/markdown'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md*`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    created: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    updated: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    category: {
      type: 'enum',
      options: ['technology', 'culture'],
      default: 'technology',
      description: `The area of interest of this piece. "Seedlings" are rough thoughts that aren't fully formed yet.`,
    },
    growthStage: {
      type: 'enum',
      options: ['seedling', 'budding', 'evergreen'],
      default: 'seedling',
      description: `How developed the idea is.`,
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
    filePathPattern: `books/**/*.md*`,
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

export const NowUpdate = defineDocumentType(() => ({
  name: 'NowUpdate',
  filePathPattern: `now/*.md*`,
  fields: {
      title: {
          type: 'string',
          description: 'Title of the life update',
          required: true,
      },
  },
}))


export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.md*`,
  fields: {
      title: {
          type: 'string',
          description: 'Meta title of the page.',
          required: true,
      },
      description: {
          type: 'string',
          description: 'Meta description of the page.',
          required: true,
      },
  },
  computedFields: {
      url: {
        type: 'string',
        resolve: (page) => `/${page._raw.sourceFileName.slice(0, page._raw.sourceFileName.lastIndexOf('.'))}`,
      },
  },
}))


export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.md*`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the project',
      required: true,
    },
    organization: {
      type: 'string',
      description: 'The organization or client the work was built for.',
      required: true,
    },
    role: {
      type: 'string',
      description: 'Your role on the project.',
      required: true,
    },
    created: {
      type: 'date',
      description: 'The start date of the project.',
      required: true,
    },
    updated: {
      type: 'date',
      description: 'The date this project was last worked on.',
      required: true,
    },
    tools: {
      type: 'string',
      description: 'The tools used on the project. Currently has to be a string but should be a list.',
      required: true,
    },
  },
  computedFields: {
      url: {
        type: 'string',
        resolve: (page) => `/projects/${page._raw.sourceFileName.slice(0, page._raw.sourceFileName.lastIndexOf('.'))}`,
      },
  },
}))

export default makeSource({
    contentDirPath: 'vault/public',
    documentTypes: [
        Post,
        Book,
        NowUpdate,
        Page,
        Project,
    ],
    mdx: {
      remarkPlugins: [remarkFootnotes, remarkPrism, remarkExternalLinks],
    },
})
