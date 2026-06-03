'use client'

import React from 'react'

import { IconMapPinFilled, IconShieldCheckFilled } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { Breadcrumb } from 'antd'

import ImgCadsquadCard from '@/assets/images/cadsquad-card.webp'
import Focus1 from '@/assets/images/focus_1.webp'
import ImgVision from '@/assets/images/vision-banner.webp'
import TeamImg from '@/assets/images/team.webp'
import { COMPANY_NAME } from '@/shared/constants/appConstant'

export default function AboutUsPage() {
    const companyName = COMPANY_NAME['enName']
    const companyInfo = [
        {
            icon: IconMapPinFilled,
            label: 'From',
            value: 'Vietnam',
        },
        {
            icon: IconShieldCheckFilled,
            label: 'Since',
            value: 'Nov 10th, 2022',
        },
    ]

    return (
        <div className="min-h-screen pb-32 max-w-screen">
            <section className="relative w-full overflow-hidden h-72">
                <div className="relative size-full">
                    <img
                        src={ImgVision as unknown as string}
                        alt="Image"
                        className="object-cover size-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
                </div>
                <div className="absolute top-[50%] translate-y-[-50%] left-0 w-screen">
                    <div className="container" style={{ color: 'white' }}>
                        <Breadcrumb
                            items={[
                                { title: 'Home' },
                                { title: 'About us' },
                                {
                                    title: (
                                        <Link
                                            to="/about-us/vision"
                                            style={{ color: 'white' }}
                                            className="font-medium"
                                        >
                                            Vision
                                        </Link>
                                    ),
                                },
                            ]}
                            style={{ color: '#99a1af' }}
                            separator={<p className="text-gray-400">/</p>}
                        />
                        <h2 className="mt-5 text-6xl font-bold font-saira">
                            Our Vision
                        </h2>
                        <p className="mt-3">Building the future of engineering design</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-12 text-lg leading-loose text-justify">
                    <div className="items-start justify-center h-full gap-8 md:flex min-h-fit">
                        <div className="border-solid border-[1px] border-border p-8 pb-4 w-full">
                            <div className="flex flex-col items-center pb-5 text-center">
                                <img
                                    src={ImgCadsquadCard as unknown as string}
                                    alt="Cadsquad avatar"
                                    className="rounded-full size-36"
                                    title="Cadsquad avatar"
                                />
                                <span className="mt-5 text-base font-bold uppercase">
                                    {companyName}
                                </span>
                            </div>
                            <div className="pt-5 border-t-2 border-solid">
                                {companyInfo.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between mb-4 text-base"
                                    >
                                        <div className="flex items-center justify-start gap-2">
                                            <item.icon />
                                            <p className="font-medium">{item.label}</p>
                                        </div>
                                        <p className="font-semibold">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <section
                            className="md:mt-0 h-fit"
                            style={{
                                backgroundImage:
                                    "url('https://res.cloudinary.com/dqx1guyc0/image/upload/v1750452293/Cadsquad/u28sazqxenpryifqd8da.webp')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="mb-5">
                                <p className="indent-8">
                                    CADSQUAD is a leading engineering design company based in Vietnam, dedicated to delivering precision-driven CAD solutions to global clients.
                                </p>
                                <p className="mt-3 indent-8">
                                    Our team of experienced engineers combines technical expertise with creative problem-solving to bring your engineering visions to life.
                                </p>
                            </div>
                        </section>
                    </div>
                    <div className="gap-8 md:flex">
                        <p className="indent-8">
                            We envision a world where engineering design is accessible, efficient, and innovative — empowering businesses of all sizes to compete on a global scale.
                        </p>
                        <img
                            src={Focus1 as unknown as string}
                            alt="Focus one"
                            title="Image"
                            loading="eager"
                            className="mx-auto mt-3 rounded-md md:w-[50%] md:h-[50%] lg:w-[500px] lg:h-[282px]"
                        />
                    </div>
                </div>
                <div className="space-y-5 mt-12">
                    <img src={TeamImg as unknown as string} alt="Team" className="rounded-sm" />
                </div>
            </section>
        </div>
    )
}
