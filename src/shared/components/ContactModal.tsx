'use client'

import React, { useState } from 'react'

import { Button, Input, addToast } from '@heroui/react'
import { Modal } from 'antd'
import { Mail } from 'lucide-react'

import { CONTACT_INFORMATIONS } from '../constants/appConstant'

type Props = {
    isOpen: boolean
    onClose: () => void
}
export default function ContactModal({ isOpen, onClose }: Props) {
    const mailAddress = 'Contact@cadsquad.vn'
    const [isLoading, setLoading] = useState(false)

    const copyToClipboard = async () => {
        try {
            setLoading(true)
            await navigator.clipboard.writeText(mailAddress)
            addToast({ title: 'Copied to clipboard!', color: 'success' })
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
                    style={{ background: 'hsl(0,0%,97%)' }}
                >
                    Contact Us
                </p>
            }
            footer={<></>}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpen}
            onCancel={onClose}
            styles={{ content: { background: 'hsl(0,0%,97%)' } }}
        >
            <div className="py-4">
                <div className="w-full grid place-items-center">
                    <a
                        href="mailto:contact@cadsquad.vn"
                        target="_blank"
                        title="Contact with mail"
                    >
                        <Button
                            startContent={<Mail size={16} />}
                            className="rounded-full"
                            color="danger"
                        >
                            Send us an email
                        </Button>
                    </a>
                </div>
                <hr className="mt-6 mb-4" style={{ color: 'hsl(0, 0%, 80%)' }} />
                <p className="font-semibold">Social Media</p>
                <ul className="mt-3 flex items-center justify-start gap-2">
                    {CONTACT_INFORMATIONS.map((item, idx) => (
                        <li key={idx}>
                            <a
                                href={item.path}
                                className="p-1.5 rounded-lg cursor-pointer flex items-center justify-center flex-col hover:!bg-[#d4d4d4] transition duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                                title={item.contactName}
                            >
                                <div
                                    className="size-[60px] flex items-center justify-center rounded-full"
                                    style={{ background: item.color, color: 'white' }}
                                >
                                    <item.icon />
                                </div>
                                <p className="text-black mt-1">{item.contactName}</p>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mt-7">
                    <Input
                        value={mailAddress}
                        startContent={<Mail style={{ color: 'hsl(0,0%,40%)' }} />}
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
                                Copy
                            </Button>
                        }
                        style={{ caretColor: 'transparent' }}
                        classNames={{ inputWrapper: 'border-[1px] bg-[#ffffff]' }}
                        size="lg"
                    />
                </div>
            </div>
        </Modal>
    )
}
