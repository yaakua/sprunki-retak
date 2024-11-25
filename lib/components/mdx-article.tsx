import { cn } from '@/lib/utils/commons';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from "next/link";
import React from "react";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";

function Table({data}: { data: any }) {
    const headers = data.headers.map((header: any, index: number) => (
        <th key={index}>{header}</th>
    ))
    const rows = data.rows.map((row: any, index: number) => (
        <tr key={index}>
            {row.map((cell: any, cellIndex: number) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ))

    return (
        <table>
            <thead>
            <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

function CustomLink(props: any) {
    const href = props.href

    if (href.startsWith("/")) {
        return (
            <Link href={href} {...props}>
                {props.children}
            </Link>
        )
    }

    if (href.startsWith("#")) {
        return <a {...props} />
    }

    return <a rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
    return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({children, ...props}: { children: any }) {
    const codeHTML = highlight(children)
    return <code dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
}

function slugify(str: string) {
    if (!str) return ""
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/<br>/g, "<br/>")
}

function createHeading(level: number) {
    const Heading = ({children}: { children: any }) => {
        const slug = slugify(children)
        return React.createElement(
            `h${level}`,
            {id: slug},
            [
                React.createElement("a", {
                    href: `#${slug}`,
                    key: `link-${slug}`,
                    className: "anchor",
                }),
            ],
            children,
        )
    }

    Heading.displayName = `Heading${level}`

    return Heading
}

const overrideComponents: any = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    code: Code,
    table:Table,
}


type MdxArticleProps = {
    source: string
    className?: string
    components?: any
}


export default function MdxArticle({source, className, components = {}}: MdxArticleProps) {
    try {
        return <article
            className={cn(
                "prose prose-sm md:prose-base lg:prose-lg",
                className,
            )}
        >
            <MDXRemote
                source={source}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                }}
                components={{...overrideComponents, ...components}}
            />
        </article>
    } catch (error) {
        console.error("MDX 解析错误:", error)
        return <div>内容加载失败，请稍后再试。</div>
    }

}
