import React from 'react'
import type { SVGProps } from 'react'

export function UKFlag(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={24}
            viewBox="0 0 640 480"
            {...props}
        >
            <path fill="#fff" d="M0 0h640v480H0z"></path>
            <path fill="#ce1124" d="M281.6 0h76.8v480h-76.8z"></path>
            <path fill="#ce1124" d="M0 201.6h640v76.8H0z"></path>
        </svg>
    )
}
