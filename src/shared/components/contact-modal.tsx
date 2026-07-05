'use client'

import React, { useState } from 'react'

import { Button, Input, addToast } from '@heroui/react'
import { Modal } from 'antd'
import { Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { CONTACT_INFORMATIONS } from '../constants/appConstant'

type Props = {
    isOpen: boolean
    onClose: () => void
}
export default function ContactModal({ isOpen, onClose }: Props) {
    const tModal = useTranslations('modal.contactModal')
    const mailAddress = 'Contact@cadsquad.vn'

    const [isLoading, setLoading] = useState(false)

    const copyToClipboard = async () => {
        try {
            setLoading(true)
            await navigator.clipboard.writeText(mailAddress)
            addToast({
                title: tModal('success'),
                color: 'success',
            })
            console.log('Text copied to clipboard successfully!')
        } catch (err) {
            console.error('Failed to copy text: ', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title={
                <p
                    className="text-center text-lg font-medium"
                    style={{
                        background: 'hsl(0,0%,97%)',
                    }}
                >
                    {tModal('title')}
                </p>
            }
            footer={<></>}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpen}
            onCancel={onClose}
            styles={{
                content: {
                    background: 'hsl(0,0%,97%)',
                },
            }}
        >
            <div className="py-4">
                <div className="w-full grid place-items-center">
                    <Link
                        href={'mailto:contact@cadsquad.vn'}
                        passHref
                        target="_blank"
                        title="Contact with mail"
                    >
                        <Button
                            startContent={<Mail size={16} />}
                            className="rounded-full"
                            color="danger"
                        >
                            {tModal('cta')}
                        </Button>
                    </Link>
                </div>
                <hr
                    className="mt-6 mb-4"
                    style={{ color: 'hsl(0, 0%, 80%)' }}
                />
                <p className="font-semibold">{tModal('socialMedia')}</p>
                <ul className="mt-3 flex items-center justify-start gap-2">
                    {CONTACT_INFORMATIONS.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <Link
                                    href={item.path}
                                    passHref
                                    className="p-1.5 rounded-lg cursor-pointer flex items-center justify-center flex-col hover:!bg-[#d4d4d4] transition duration-300"
                                    target="_blank"
                                    title={item.contactName}
                                >
                                    <div
                                        className="size-[60px] flex items-center justify-center rounded-full"
                                        style={{
                                            background: item.color,
                                            color: 'white',
                                        }}
                                    >
                                        <item.icon />
                                    </div>
                                    <p className="text-black mt-1">
                                        {item.contactName}
                                    </p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="mt-7">
                    <Input
                        value={mailAddress}
                        startContent={
                            <Mail style={{ color: 'hsl(0,0%,40%)' }} />
                        }
                        variant="bordered"
                        endContent={
                            <Button
                                isLoading={isLoading}
                                size="sm"
                                className="px-8 rounded-xl bg-secondary text-white"
                                onPress={async () => {
                                    await copyToClipboard()
                                }}
                            >
                                {tModal('copy')}
                            </Button>
                        }
                        style={{
                            caretColor: 'transparent',
                        }}
                        classNames={{
                            inputWrapper: 'border-[1px] bg-[#ffffff]',
                        }}
                        size="lg"
                    />
                </div>
            </div>
        </Modal>
    )
}
