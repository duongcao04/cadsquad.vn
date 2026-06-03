import { Image } from 'antd'
import parse, {
    type DOMNode,
    Element,
    type HTMLReactParserOptions,
    domToReact,
} from 'html-react-parser'
import { Link } from '@tanstack/react-router'

type HtmlReactParserProps = {
    htmlString: string
}
export function HtmlReactParser({ htmlString }: HtmlReactParserProps) {
    const options: HTMLReactParserOptions = {
        replace: (domNode: DOMNode) => {
            // We must check if the node is an Element (an HTML tag) before accessing attribs
            if (domNode instanceof Element && domNode.attribs) {
                // 1. Replace <a> with Custom <Link>
                if (domNode.name === 'a') {
                    const { href, class: className } = domNode.attribs

                    // Ensure strictly internal links use TanStack Router Link
                    if (href && href.startsWith('/')) {
                        return (
                            <Link to={href} className={className}>
                                {domToReact(
                                    domNode.children as DOMNode[],
                                    options
                                )}
                            </Link>
                        )
                    }
                }

                // 2. Replace <img> with Ant Design <Image>
                if (domNode.name === 'img') {
                    const {
                        src,
                        alt,
                        width,
                        height,
                        class: className,
                    } = domNode.attribs

                    // Antd Image works best with numeric width/height if provided
                    if (width && height) {
                        return (
                            <Image
                                src={src}
                                alt={alt || 'image'}
                                width={parseInt(width, 10)}
                                height={parseInt(height, 10)}
                                className={className}
                            />
                        )
                    }
                }
            }
        },
    }

    return <div className="prose max-w-full">{parse(htmlString, options)}</div>
}
