import React from 'react'

import { Button } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { Download } from 'lucide-react'

export default function ButtonDownloadBrochure({
    downloadUrl,
}: {
    downloadUrl?: string
}) {
    return downloadUrl ? (
        <Link
            to={downloadUrl}
            title="CSD- Profile 2025.pdf"
            target="_blank"
            className="block"
        >
            <Button
                size="lg"
                className="mt-5 rounded-sm border-3 border-transparent hover:border-white duration-150"
                variant="secondary"
            >
                <Download />
                <p className="text-sm lg:text-base">Download Brochure</p>
            </Button>
        </Link>
    ) : (
        <></>
    )
}
