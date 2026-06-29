'use client'

import { useState } from 'react'

import { Button, Input, Textarea, addToast } from '@heroui/react'
import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'

import { ContactSchema } from '@/validationSchemas/contact.schema'

export default function ContactForm() {
    /**
     * LOADING state for submit button
     */
    const [isLoading, setLoading] = useState<boolean>(false)

    const tButton = useTranslations('button')
    const tSendEmail = useTranslations('toast.sendEmail')

    const formik = useFormik({
        validationSchema: ContactSchema,
        initialValues: {
            fullName: '',
            email: '',
            message: '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
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
                formik.resetForm()
            } catch (error) {
                addToast({
                    title: tSendEmail('failed'),
                    description: `${error}`,
                    color: 'danger',
                })
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5 size-full">
            <Input
                id="fullName"
                name="fullName"
                label="Full name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                errorMessage={
                    Boolean(formik.touched.fullName) && formik.errors.fullName
                }
                isInvalid={
                    Boolean(formik.errors.fullName) &&
                    Boolean(formik.touched.fullName)
                }
            />
            <Input
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                errorMessage={
                    Boolean(formik.touched.email) && formik.errors.email
                }
                isInvalid={
                    Boolean(formik.errors.email) &&
                    Boolean(formik.touched.email)
                }
            />
            <Textarea
                id="message"
                name="message"
                label="Message"
                value={formik.values.message}
                onChange={formik.handleChange}
                errorMessage={
                    Boolean(formik.touched.message) && formik.errors.message
                }
                isInvalid={
                    Boolean(formik.errors.message) &&
                    Boolean(formik.touched.message)
                }
            />
            <div className="grid w-full mt-7 place-items-center">
                <Button
                    className="px-10 py-6"
                    color="primary"
                    isLoading={isLoading}
                    type="submit"
                >
                    {tButton('sendMessage')}
                </Button>
            </div>
        </form>
    )
}
