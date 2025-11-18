import React from 'react'

import { Button } from '@heroui/react'
import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function ButtonDownloadBrochure() {
    const tButton = useTranslations('button')
    return (
        <Link
            href={'/sites/default/files/CSD-%20Profile%202025.pdf'}
            passHref
            title="CSD- Profile 2025.pdf"
            target="_blank"
            className="block"
        >
            <Button
                size="lg"
                className="mt-5 rounded-sm border-3 border-transparent hover:border-white duration-150"
                startContent={<Download />}
                color="secondary"
            >
                <p className="text-sm lg:text-base">
                    {tButton('downloadBrochure')}
                </p>
            </Button>
        </Link>
    )
}
