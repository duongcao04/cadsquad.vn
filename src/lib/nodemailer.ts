import nodemailer from 'nodemailer'

import envConfig from '@/config/config'

let transporter: nodemailer.Transporter | null = null

export function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: envConfig.NEXT_PUBLIC_SMTP_USER,
                pass: envConfig.NEXT_PUBLIC_SMTP_PASS,
            },
        })
    }

    return transporter
}
