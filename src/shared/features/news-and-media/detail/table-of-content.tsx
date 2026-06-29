'use client'

import React from 'react'

import { Anchor, AnchorProps } from 'antd'
import { AnchorLinkItemProps } from 'antd/es/anchor/Anchor'

import { usePathname, useRouter } from '@/i18n/navigation'
import { getHeadingId, getHeadings } from '@/lib/markdown'

type Props = { source: string }

export default function TableOfContent({ source }: Props) {
    const currentPath = usePathname()
    const router = useRouter()
    const headings = getHeadings(source, {
        levels: [1, 2],
    })

    const handleClick = (
        e: React.MouseEvent<HTMLElement>,
        link: {
            title: React.ReactNode
            href: string
        }
    ) => {
        e.preventDefault()
        router.push(`${currentPath}${link.href}`)
    }

    const toAnchorData = (items: { level: number; text: string }[]) => {
        const result = []
        let key = 1
        let currentParent = null

        for (const item of items) {
            const title =
                item.text.split('')[0].match(/\d+/) &&
                item.text.split('')[1] === '.'
                    ? item.text.split('.')[1].trim()
                    : item.text
            const anchorItem: AnchorLinkItemProps = {
                key: `${key++}`,
                href: '#' + getHeadingId(item.text),
                title,
            }

            if (item.level === 1) {
                currentParent = anchorItem
                result.push(currentParent)
            } else if (item.level === 2 && currentParent) {
                if (!currentParent.children) {
                    currentParent.children = []
                }
                currentParent.children.push(anchorItem)
            }
        }
        return result
    }

    const anchorItems: AnchorProps['items'] = toAnchorData(headings)

    return <Anchor affix={false} onClick={handleClick} items={anchorItems} />
}
