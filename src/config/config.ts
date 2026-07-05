import { z } from 'zod'

const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string().optional(),
    NEXT_PUBLIC_URL: z.string().optional(),
    NEXT_PUBLIC_CADSQUAD_EMAIL: z.string().optional(),
    NEXT_PUBLIC_NODEMAILER_PORT: z.string().optional(),
    NEXT_PUBLIC_SMTP_USER: z.string().optional(),
    NEXT_PUBLIC_SMTP_PASS: z.string().optional(),
    FIREBASE: z.object({
        NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
        NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
        NEXT_PUBLIC_FIREBASE_DATABASE_URL: z.string().optional(),
    }),
})

function configProject() {
    try {
        const config = configSchema.parse({
            NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
            NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
            NEXT_PUBLIC_CADSQUAD_EMAIL: process.env.NEXT_PUBLIC_CADSQUAD_EMAIL,
            NEXT_PUBLIC_NODEMAILER_PORT:
                process.env.NEXT_PUBLIC_NODEMAILER_PORT,
            NEXT_PUBLIC_SMTP_USER: process.env.NEXT_PUBLIC_SMTP_USER,
            NEXT_PUBLIC_SMTP_PASS: process.env.NEXT_PUBLIC_SMTP_PASS,
            FIREBASE: {
                NEXT_PUBLIC_FIREBASE_API_KEY:
                    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
                    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                NEXT_PUBLIC_FIREBASE_PROJECT_ID:
                    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
                    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
                    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                NEXT_PUBLIC_FIREBASE_APP_ID:
                    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
                    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
                NEXT_PUBLIC_FIREBASE_DATABASE_URL:
                    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
            },
        })
        return config
    } catch (error) {
        console.log(error)
        throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
    }
}

const envConfig = configProject()
export default envConfig
