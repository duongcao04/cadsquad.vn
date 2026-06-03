'use client'

import { Image } from 'antd'
import { MoveUpRight } from 'lucide-react'
import { Variants } from 'motion'
import { Link } from '@tanstack/react-router'

import { MotionButton, MotionDiv, MotionP } from '@/lib/motion'
import { CadService } from '@/validationSchemas/cad-service.schema'

const buttonTextVariants: Variants = {
    init: {
        display: 'none',
        transition: {
            duration: 0.05,
        },
    },
    animate: {
        display: 'none',
        transition: {
            duration: 0.05,
        },
    },
    hover: {
        display: 'block',
        transition: {
            duration: 0.05,
        },
    },
}

export default function ServiceCard({ data }: { data: CadService }) {
    const title = data.title.original

    return (
        <div key={data.id} title={title} className="px-3">
            <MotionDiv
                initial="init"
                animate="animate"
                whileHover="hover"
                className="relative w-full aspect-video md:aspect-[1/1.3] rounded-xl border border-border overflow-hidden"
            >
                <Link
                    to="/cad-services/$slug"
                    params={{ slug: data.slug ?? '' }}
                    className="block group size-full"
                >
                    <Image
                        src={data?.thumbnail?.vertical}
                        alt="Service image"
                        title={title}
                        rootClassName="!block size-full"
                        className="!block !size-full object-cover rounded-xl brightness-50 group-hover:scale-125 transition duration-250"
                        preview={false}
                    />
                    <div className="py-3 px-5 absolute top-1">
                        <p className="text-white text-lg font-semibold font-saira max-w-[90%]">
                            {title}
                        </p>
                    </div>
                </Link>
                <Link to="/cad-services/$slug" params={{ slug: data.slug ?? '' }} className="block">
                    <MotionButton className="absolute right-3 bottom-4 text-white rounded-full backdrop-blur-xs border-1.5 border-border px-4 py-3 flex items-center justify-center gap-2 cursor-pointer hover:backdrop-blur-3xl transition">
                        <MoveUpRight size={16} />
                        <MotionP
                            variants={buttonTextVariants}
                            className="leading-none text-base"
                        >
                            Explorer
                        </MotionP>
                    </MotionButton>
                </Link>
            </MotionDiv>
        </div>
    )
}
