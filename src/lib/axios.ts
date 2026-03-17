import axios from 'axios'

import { apiBaseUrl } from './utils'

export type ApiResponse<T = unknown, D = Record<string, unknown>> = {
	success: boolean
	message: string
	error?: string
	result?: T
	meta?: D
	timestamp?: string
}

export type ApiError = {
	success: boolean
	message: string
	error?: string
	timestamp?: string
}

export const axiosClient = axios.create({
	baseURL: apiBaseUrl, // API endpoint url
	timeout: 5000, // Request timeout
	withCredentials: true, // Allow sending cookies
})
axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Các xử lý lỗi khác giữ nguyên
		if (error.response) {
			console.error(
				'Response error:',
				error.response.status,
				error.response.data
			)
			return Promise.reject(error.response.data)
		}
		// ... (phần còn lại của code cũ)
		return Promise.reject(error)
	}
)

// Create a separate instance specifically for Multipart forms
export const axiosClientMultipart = axios.create({
	baseURL: apiBaseUrl,
	// timeout: 30000, // Uploads might take longer, so increased timeout is good
	withCredentials: true,
})

/**
 * This is for Form-data
 */
// Request Interceptor: ONLY handles Authentication
axiosClientMultipart.interceptors.request.use(
	(error) => {
		if (error?.response) return Promise.reject(error.response)
		return Promise.reject(error)
	}
)