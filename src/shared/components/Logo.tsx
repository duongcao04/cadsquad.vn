import React from 'react'

import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

import CSDWhiteLogo from '/logo-white.webp'
import CSDLogo from '/logo.webp'

type Props = {
    canRedirect?: boolean
    href?: string
    classNames?: {
        root?: string
        logo?: string
    }
    logoTheme?: 'white' | 'default'
}

export default function Logo({
    logoTheme = 'default',
    canRedirect = true,
    href = '/',
    classNames,
}: Props) {
    const logoSrc = logoTheme === 'default' ? CSDLogo : CSDWhiteLogo
    const wrapperClassName = cn('block w-fit', classNames?.root)

    const imgEl = (
        <img
            src={logoSrc as unknown as string}
            alt="CSD Logo"
            className={cn('object-contain w-fit', classNames?.logo)}
        />
    )

    return canRedirect ? (
        <Link to={href} className={cn('block', wrapperClassName)}>
            {imgEl}
        </Link>
    ) : (
        <div className={wrapperClassName}>{imgEl}</div>
    )
}
