'use client'

import React from 'react'

import { Button } from '@heroui/react'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

export default function ReturnBtn() {
    const tNewMedia = useTranslations('landing.newsMedia')
    return (
        <Link href={'/news-and-media'} passHref className="block">
            <Button startContent={<ChevronLeft size={16} />} variant="light">
                {tNewMedia('button.allPosts')}
            </Button>
        </Link>
    )
}
