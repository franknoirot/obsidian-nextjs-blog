import { allDocuments } from "contentlayer/generated";

export function parseObsidianLinks(content: string): string {
    const obsidianLinkRegex = /\[\[(.+?(\|.+?)?)\]\]([\W])/g

    const transformedContent = content.replace(obsidianLinkRegex, (_, p1, p2, p3) => {
        const slug = p1.includes("|") ? p1.slice(0, p1.indexOf("|")) : p1
        const url = allDocuments.find(doc => doc.url.includes(slug))?.url;

        const linkText = (p2) ? p2.slice(1) : p1

        const linkHtml = `[${ linkText }](${ url })` + p3
        return linkHtml
    })

    return transformedContent
}