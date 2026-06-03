'use client'

import React from 'react'

import { Button } from '@heroui/react'
import { ChevronLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export default function ReturnBtn() {
    return (
        <Link to={'/news-and-media'} className="block">
            <Button startContent={<ChevronLeft size={16} />} variant="light">
                All posts
            </Button>
        </Link>
    )
}
