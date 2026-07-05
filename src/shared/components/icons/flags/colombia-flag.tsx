import React from 'react'
import type { SVGProps } from 'react'

export function ColombiaFlag(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={24}
            viewBox="0 0 640 480"
            {...props}
        >
            <g fillRule="evenodd" strokeWidth={1}>
                <path fill="#ffe800" d="M0 0h640v480H0z"></path>
                <path fill="#00148e" d="M0 240h640v240H0z"></path>
                <path fill="#da0010" d="M0 360h640v120H0z"></path>
            </g>
        </svg>
    )
}
