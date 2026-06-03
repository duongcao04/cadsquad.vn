import React from 'react'

import { Link } from '@tanstack/react-router'
import { Breadcrumb } from 'antd'

export function PageBreadcumbs({ pageName }: { pageName: string }) {
    return (
        <Breadcrumb
            items={[
                {
                    title: (
                        <Link to="/" style={{ color: 'hsl(0,0%,75%)' }}>
                            Home
                        </Link>
                    ),
                },
                {
                    title: (
                        <Link
                            to="/cad-services"
                            style={{ color: 'hsl(0,0%,75%)' }}
                        >
                            CAD Services
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
            style={{ color: '#c4c4c4' }}
            separator={<p className="text-gray-400">/</p>}
        />
    )
}
