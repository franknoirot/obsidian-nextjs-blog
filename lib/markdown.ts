import { allDocuments, Book, Page, Post, Project } from "contentlayer/generated";
import React from "react";

type DocumentTypesNoNowUpdates = Book | Page | Post | Project

export function parseObsidianLinks(content: string): string {
    const obsidianLinkRegex = /\[\[(.+?(\|.+?)?)\]\]([\W])/g
    if (!content) return ''

    let transformedContent = content.replace(obsidianLinkRegex, (_, p1, p2, p3) => {
        const slug = p1.includes("|") ? p1.slice(0, p1.indexOf("|")) : p1
        
        const filteredDocs = allDocuments.filter(doc => !['NowUpdate'].includes(doc.type)) as DocumentTypesNoNowUpdates[]
        const url = filteredDocs.find((doc: DocumentTypesNoNowUpdates) => doc.url.includes(slug))?.url;

        const linkText = (p2) ? p2.slice(1) : p1

        const linkHtml = `[${ linkText }](${ url })` + p3
        return linkHtml
    })

    return transformedContent
}


interface IParseCodeBlockProps extends React.PropsWithChildren {
    node: any,
    inline: boolean,
    className: string,
    props: any,
}