import { render } from '@react-email/components'
import { NextRequest } from 'next/server'

import envConfig from '@/config/config'
import { getTransporter } from '@/lib/nodemailer'
import EmailTemplate from '@/shared/components/email-template'

const EMAIL_SUBJECT = '[cadsquad.vn] Customer wants to connect'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { fullName, email, message } = body

        if (!fullName || !email || !message) {
            return Response.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const emailHtml = await render(
            EmailTemplate({ fullName, email, message })
        )

        await getTransporter().sendMail({
            from: `${fullName} <${email}>`,
            to: [
                `${envConfig.NEXT_PUBLIC_CADSQUAD_EMAIL}`,
                'caohaiduong04@gmail.com',
            ],
            subject: EMAIL_SUBJECT,
            html: emailHtml,
        })

        return Response.json(
            {
                success: true,
                message: 'Send email successfully!',
            },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)

        return Response.json({ error }, { status: 500 })
    }
}
