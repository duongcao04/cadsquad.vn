'use client'

import React, { useState } from 'react'

import { Button, Spinner, toast } from '@heroui/react'
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
            toast.success('Copied to clipboard!')
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
                            className="rounded-full"
                            variant="danger"
                        >
                            <Mail size={16} />
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
                    <div className="flex items-center border border-gray-300 rounded-xl bg-white px-3 gap-2">
                        <Mail style={{ color: 'hsl(0,0%,40%)', flexShrink: 0 }} size={16} />
                        <input
                            value={mailAddress}
                            readOnly
                            style={{ caretColor: 'transparent', outline: 'none', flex: 1, background: 'transparent', padding: '12px 0', fontSize: '16px' }}
                        />
                        <Button
                            size="sm"
                            className="px-8 rounded-xl bg-secondary text-white shrink-0"
                            onPress={copyToClipboard}
                            isDisabled={isLoading}
                        >
                            {isLoading ? <Spinner size="sm" color="current" /> : 'Copy'}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
