'use client'

import { useState } from 'react'

import { Button, Spinner, TextArea, toast } from '@heroui/react'
import { useFormik } from 'formik'
import { ContactSchema } from '@/validationSchemas/contact.schema'

export default function ContactForm() {
    const [isLoading, setLoading] = useState<boolean>(false)

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

                toast.success('Email sent successfully!')
                formik.resetForm()
            } catch (error) {
                toast.danger('Failed to send email.', { description: `${error}` })
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5 size-full">
            <div className="flex flex-col gap-1">
                <label htmlFor="fullName" className="text-sm font-medium text-white/80">Full name</label>
                <input
                    id="fullName"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    className={`w-full px-3 py-2 rounded-lg border bg-white/10 text-white placeholder-white/50 outline-none focus:border-primary ${
                        formik.touched.fullName && formik.errors.fullName ? 'border-danger' : 'border-white/20'
                    }`}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-danger text-sm">{formik.errors.fullName}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={`w-full px-3 py-2 rounded-lg border bg-white/10 text-white placeholder-white/50 outline-none focus:border-primary ${
                        formik.touched.email && formik.errors.email ? 'border-danger' : 'border-white/20'
                    }`}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-danger text-sm">{formik.errors.email}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                <TextArea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    className={`w-full px-3 py-2 rounded-lg border bg-white/10 text-white placeholder-white/50 outline-none focus:border-primary min-h-[100px] ${
                        formik.touched.message && formik.errors.message ? 'border-danger' : 'border-white/20'
                    }`}
                />
                {formik.touched.message && formik.errors.message && (
                    <p className="text-danger text-sm">{formik.errors.message}</p>
                )}
            </div>
            <div className="grid w-full mt-7 place-items-center">
                <Button
                    className="px-10 py-6"
                    variant="primary"
                    isDisabled={isLoading}
                    type="submit"
                >
                    {isLoading ? <Spinner size="sm" color="current" /> : 'Send Message'}
                </Button>
            </div>
        </form>
    )
}
