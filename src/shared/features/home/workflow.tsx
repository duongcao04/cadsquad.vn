'use client'

import React from 'react'

import { Accordion, AccordionItem } from '@heroui/react'
import { Image } from 'antd'
import { useLocale, useTranslations } from 'next-intl'

import { MotionDiv } from '@/lib/motion'
import { VI_WORKFLOW, WORKFLOW } from '@/shared/constants/workflow'
import { Section, fadeInUp } from '@/shared/features/home/section'

export default function Workflow() {
    const locale = useLocale()
    const tHome = useTranslations('landing.home')

    const workflow = locale === 'vi' ? VI_WORKFLOW : WORKFLOW

    return (
        <Section.Wrapper className="gap-5 lg:gap-8">
            <Section.Title className="!text-center">
                {tHome.rich('sections.workflow.title', {
                    highlight: (chunk) => (
                        <span className="text-primary">{chunk}</span>
                    ),
                })}
            </Section.Title>
            <div className="lg:grid grid-cols-2 gap-8">
                <MotionDiv
                    {...fadeInUp(0.15)}
                    className="size-full flex items-center justify-center"
                >
                    <Image
                        src="https://res.cloudinary.com/dqx1guyc0/image/upload/v1754214620/Cadsquad/workflow_gh3ixj.png"
                        alt="Workflow"
                        preview={{
                            imageRender: (child) => {
                                return <div className="bg-white">{child}</div>
                            },
                        }}
                    />
                </MotionDiv>
                <div>
                    <Accordion defaultSelectedKeys={['0']}>
                        {workflow.map((item, idx) => {
                            return (
                                <AccordionItem
                                    key={idx}
                                    aria-label={item.title}
                                    title={
                                        <MotionDiv
                                            {...fadeInUp((idx + 1) * 0.1)}
                                            className="flex items-center justify-start gap-5 w-full cursor-pointer"
                                        >
                                            <div
                                                className="p-4 rounded-full h-full aspect-square flex items-center justify-center"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            >
                                                <p className="text-base lg:text-xl font-bold text-white">
                                                    {item.stepNumber}
                                                </p>
                                            </div>
                                            <p className="text-base lg:text-lg font-semibold capitalize">
                                                {item.title}
                                            </p>
                                        </MotionDiv>
                                    }
                                >
                                    <p className="pb-2 text-sm lg:text-base tracking-wide">
                                        {item.description}
                                    </p>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </div>
        </Section.Wrapper>
    )
}
