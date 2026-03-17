import React from 'react'

import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

import CSDWhiteLogo from '../../../public/logo-white.webp'
import CSDLogo from '../../../public/logo.webp'

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
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        const wrapperClassName = cn('block w-fit', classNames?.root)
        return canRedirect ? (
            <Link href={href} className={cn('block', wrapperClassName)}>
                {children}
            </Link>
        ) : (
            <div className={wrapperClassName}>{children}</div>
        )
    }

    return (
        <Wrapper>
            <Image
                src={logoTheme === 'default' ? CSDLogo : CSDWhiteLogo}
                alt="CSD Logo"
                className={cn('object-contain w-fit', classNames?.logo)}
                quality={100}
            />
        </Wrapper>
    )
}
