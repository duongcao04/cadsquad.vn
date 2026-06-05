'use client'

import React from 'react'

import { Accordion } from '@heroui/react'
import { Image } from 'antd'

import { MotionDiv } from '@/lib/motion'
import { WORKFLOW } from '@/shared/constants/workflow'

import HeadingSection from './HeadingSection'

export default function Workflow() {
    const workflow = WORKFLOW

    return (
        <div className="container space-y-5 lg:space-y-8">
            <HeadingSection className="!text-center">
                How do we <span className="text-primary">work</span> ?
            </HeadingSection>
            <div className="lg:grid grid-cols-2 gap-8">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay: 0.15,
                            type: 'spring',
                            stiffness: 120,
                            damping: 20,
                        },
                    }}
                    viewport={{ once: true }}
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
                    <Accordion defaultExpandedKeys={['0']}>
                        {workflow.map((item, idx) => (
                            <Accordion.Item key={idx} id={String(idx)}>
                                <Accordion.Heading>
                                    <Accordion.Trigger>
                                        <MotionDiv
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    delay: (idx + 1) * 0.1,
                                                    type: 'spring',
                                                    stiffness: 120,
                                                    damping: 20,
                                                },
                                            }}
                                            viewport={{ once: true }}
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
                                    </Accordion.Trigger>
                                </Accordion.Heading>
                                <Accordion.Panel>
                                    <p className="pb-2 text-sm lg:text-base tracking-wide">
                                        {item.description}
                                    </p>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
