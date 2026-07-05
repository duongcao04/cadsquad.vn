'use client'

import { Button, Input, Textarea, addToast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Contact, ContactSchema } from '@/validationSchemas/contact.schema'

export default function ContactForm() {
    const tButton = useTranslations('button')
    const tSendEmail = useTranslations('toast.sendEmail')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Contact>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            fullName: '',
            email: '',
            message: '',
        },
    })

    const onSubmit = handleSubmit(async (values) => {
        try {
            await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: values.fullName,
                    email: values.email,
                    message: values.message,
                }),
            })

            addToast({
                title: tSendEmail('success'),
                color: 'success',
            })
            reset()
        } catch (error) {
            addToast({
                title: tSendEmail('failed'),
                description: `${error}`,
                color: 'danger',
            })
        }
    })

    return (
        <form onSubmit={onSubmit} className="space-y-5 size-full">
            <Input
                id="fullName"
                label="Full name"
                {...register('fullName')}
                errorMessage={errors.fullName?.message}
                isInvalid={Boolean(errors.fullName)}
            />
            <Input
                id="email"
                label="Email"
                {...register('email')}
                errorMessage={errors.email?.message}
                isInvalid={Boolean(errors.email)}
            />
            <Textarea
                id="message"
                label="Message"
                {...register('message')}
                errorMessage={errors.message?.message}
                isInvalid={Boolean(errors.message)}
            />
            <div className="grid w-full mt-7 place-items-center">
                <Button
                    className="px-10 py-6"
                    color="primary"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    {tButton('sendMessage')}
                </Button>
            </div>
        </form>
    )
}
