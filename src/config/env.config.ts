import * as yup from 'yup'

const configSchema = yup.object({
    appUrl: yup.string(),
    apiEndpoint: yup.string(),
    database: yup.object({
        url: yup.string()
    }),
    nodemailder: yup.object({
        host: yup.string(),
        port: yup.string(),
        secure: yup.boolean(),
        from: yup.string(),
        smtp: yup.object({
            user: yup.string(),
            pass: yup.string(),
        })
    }),
    NEXT_PUBLIC_URL: yup.string(),
    NEXT_PUBLIC_CADSQUAD_EMAIL: yup.string(),
    NEXT_PUBLIC_NODEMAILER_PORT: yup.string(),
    NEXT_PUBLIC_SMTP_USER: yup.string(),
    NEXT_PUBLIC_SMTP_PASS: yup.string(),
    firebase: yup.object({
        apiKey: yup.string(),
        authDomain: yup.string(),
        projectId: yup.string(),
        storageBucket: yup.string(),
        messagingSenderId: yup.string(),
        appId: yup.string(),
        measurementId: yup.string(),
        databaseURL: yup.string(),
    }),
})

function configProject() {
    try {
        const config = configSchema.validateSync({
            appUrl: process.env.NEXT_PUBLIC_APP_URL,
            apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
            database: {
                url: process.env.DATABASE_URL
            },
            nodemailder: {
                host: process.env.NEXT_PUBLIC_MAIL_HOST,
                port: process.env.NEXT_PUBLIC_MAIL_PORT,
                secure: process.env.NEXT_PUBLIC_MAILER_SECURE,
                from: process.env.NEXT_PUBLIC_MAIL_FROM,
                smtp: {
                    user: process.env.NEXT_PUBLIC_MAIL_USER,
                    pass: process.env.NEXT_PUBLIC_MAIL_PASS,
                }
            },
            NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
            NEXT_PUBLIC_CADSQUAD_EMAIL: process.env.NEXT_PUBLIC_CADSQUAD_EMAIL,
            NEXT_PUBLIC_NODEMAILER_PORT:
                process.env.NEXT_PUBLIC_NODEMAILER_PORT,
            NEXT_PUBLIC_SMTP_USER: process.env.NEXT_PUBLIC_SMTP_USER,
            NEXT_PUBLIC_SMTP_PASS: process.env.NEXT_PUBLIC_SMTP_PASS,
            firebase: {
                apiKey:
                    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                authDomain:
                    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                projectId:
                    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                storageBucket:
                    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                messagingSenderId:
                    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                appId:
                    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                measurementId:
                    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
                databaseURL:
                    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
            },
        })
        return config
    } catch (error) {
        console.log(error)
        throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
    }
}

export const envConfig = configProject()
