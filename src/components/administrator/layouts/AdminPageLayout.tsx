import { HTMLProps } from 'react'

import { Badge, Card, CardBody, CardProps } from '@heroui/react'

import { cn } from '@/lib'

// Note: HTMLProps<HTMLDivElement> is usually preferred over HTMLProps<'div'> for strict TS
type AdminPageContainerProps = HTMLProps<HTMLDivElement> & {
    children: React.ReactNode
}

export function AdminPageContainer({
    children,
    className,
    ...props
}: AdminPageContainerProps) {
    return (
        <div className={`size-full pb-8 ${className || ''}`} {...props}>
            {children}
        </div>
    )
}

export function AdminPageBody({
    children,
    className,
    ...props
}: AdminPageContainerProps) {
    return (
        <div className={`mx-6 ${className || ''}`} {...props}>
            {children}
        </div>
    )
}

type AdminPageHeadingProps = {
    title: React.ReactNode
    description?: React.ReactNode
    showBadge?: boolean
    badgeCount?: number
    actions?: React.ReactNode
    classNames?: {
        wrapper?: string
        base?: string
        titleWrapper?: string
        title?: string
        description?: string
    }
    isSticky?: boolean
} & Omit<CardProps, 'title'>
export function AdminPageHeading({
    title,
    description,
    showBadge = false,
    badgeCount = 0,
    actions,
    classNames,
    isSticky = false,
    ...props
}: AdminPageHeadingProps) {
    let titleComp = (
        <h1
            className={cn(
                'text-2xl font-bold text-text-default',
                classNames?.title
            )}
        >
            {title as React.ReactNode}
        </h1>
    )
    if (showBadge) {
        titleComp = (
            <Badge
                content={badgeCount > 99 ? '99+' : badgeCount}
                size="lg"
                color="danger"
                variant="solid"
                classNames={{
                    badge: 'right-0 top-0 text-[10px]! font-bold!',
                    base: 'pr-2',
                }}
            >
                <h1
                    className={cn(
                        'text-2xl font-bold text-text-default',
                        classNames?.title
                    )}
                >
                    {title}
                </h1>
            </Badge>
        )
    }
    return (
        <Card
            {...props}
            shadow={props.shadow ?? 'none'}
            className={cn(
                'border border-border m-4 bg-background dark:bg-background/40',
                isSticky && 'sticky top-0 z-30',
                classNames?.wrapper
            )}
        >
            <CardBody
                className={cn(
                    'flex flex-row justify-between items-center px-6 py-5',
                    classNames?.base
                )}
            >
                <div className={cn(classNames?.titleWrapper)}>
                    {titleComp}
                    <p
                        className={cn(
                            'text-sm text-text-subdued',
                            classNames?.description
                        )}
                    >
                        {description}
                    </p>
                </div>
                <>{actions}</>
            </CardBody>
        </Card>
    )
}
