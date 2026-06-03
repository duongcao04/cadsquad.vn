export const envConfig = {
    appUrl: import.meta.env.VITE_APP_URL ?? 'http://localhost:3000',
    cloudinary: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string,
    },
    CADSQUAD_EMAIL: import.meta.env.VITE_CADSQUAD_EMAIL as string,
}
