import { allDocuments, Book, Page, Post, Project } from "contentlayer/generated";
import React from "react";

type DocumentTypesNoNowUpdates = Book | Page | Post | Project

export function parseObsidianLinks(content: string, isMarkdown: boolean = true): string {
    const obsidianLinkRegex = /\[\[(.+?(\|.+?)?)\]\]([\W])/g
    if (!content) return ''

    let transformedContent = content.replace(obsidianLinkRegex, (_, p1, p2, p3) => {
        const slug = p1.includes("|") ? p1.slice(0, p1.indexOf("|")) : p1
        
        const filteredDocs = allDocuments.filter(doc => !['NowUpdate'].includes(doc.type)) as DocumentTypesNoNowUpdates[]
        const doc = filteredDocs.find((doc: DocumentTypesNoNowUpdates) => doc.url.includes(slug)) as DocumentTypesNoNowUpdates;

        const linkText = (p2) ? p2.slice(1) : (doc?.title || p1)
        
        if (!doc?.url) {
            return linkText + p3
        }

        console.log({isMarkdown})

        const linkMarkup = (isMarkdown)
            ? `[${ linkText }](${ doc.url })` + p3
            : `<a href=${ doc.url } ${ (isExternal(doc.url) ? 'target="_blank" rel="nofollower noopener"' : '')}>${ linkText }</a>`
        return linkMarkup
    })

    return transformedContent
}

function isExternal(linkHref: string): boolean {
    const external = !(linkHref.startsWith('/')
        || ['franknoirot.co', 'localhost:'].some(origin => linkHref.includes(origin)))
    console.log({ linkHref, starts: linkHref.startsWith('/'), noOrigin: ['franknoirot.co', 'localhost:'].some(origin => linkHref.includes(origin)), external })
    return external
}


interface IParseCodeBlockProps extends React.PropsWithChildren {
    node: any,
    inline: boolean,
    className: string,
    props: any,
}