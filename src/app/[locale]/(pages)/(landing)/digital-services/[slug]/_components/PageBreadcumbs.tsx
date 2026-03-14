import React from 'react'

import { Breadcrumb } from 'antd'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

export default function PageBreadcumbs({ pageName }: { pageName: string }) {
    const tBreadcrumb = useTranslations('breadcrumbs')
    return (
        <Breadcrumb
            items={[
                {
                    title: (
                        <Link href="/" style={{ color: 'hsl(0,0%,75%)' }}>
                            {tBreadcrumb('home')}
                        </Link>
                    ),
                },
                {
                    title: (
                        <Link
                            href="/cad-services"
                            style={{ color: 'hsl(0,0%,75%)' }}
                        >
                            {tBreadcrumb('cadService')}
                        </Link>
                    ),
                },
                {
                    title: (
                        <p
                            style={{ color: 'hsl(0,0%,97%)' }}
                            className="font-medium"
                        >
                            {pageName}
                        </p>
                    ),
                },
            ]}
            style={{
                color: '#c4c4c4',
            }}
            separator={<p className="text-gray-400">/</p>}
        />
    )
}
