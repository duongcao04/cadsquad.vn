'use client'

import React from 'react'

import { Button } from '@heroui/react'
import { ChevronLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export default function ReturnBtn() {
    return (
        <Link to={'/news-and-media'} className="block">
            <Button variant="ghost">
                <ChevronLeft size={16} />
                All posts
            </Button>
        </Link>
    )
}
