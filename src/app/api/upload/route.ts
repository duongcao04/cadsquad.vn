import { envConfig } from '@/config'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60;

cloudinary.config({
	cloud_name: envConfig.cloudinary.cloudName,
	api_key: envConfig.cloudinary.apiKey,
	api_secret: envConfig.cloudinary.apiSecret,
})

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 })
		}

		// 1. Convert File to Buffer
		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		// 2. Convert Buffer to Base64 Data URI
		// This is the crucial fix for Next.js Serverless environments
		const mime = file.type
		const encoding = 'base64'
		const base64Data = buffer.toString('base64')
		const fileUri = `data:${mime};${encoding},${base64Data}`

		// 3. Upload string directly (no streams!)
		const result = await cloudinary.uploader.upload(fileUri, {
			folder: 'Cadsquad/CMS',
			timeout: 55000,// 2 minutes
		})

		// Return the secure URL from Cloudinary
		return NextResponse.json({ url: result.secure_url }, { status: 200 })

	} catch (error) {
		console.error('Upload error:', error)
		return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
	}
}