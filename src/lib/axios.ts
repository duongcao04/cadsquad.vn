import axios from 'axios'

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
	baseURL: '',
	timeout: 5000,
	withCredentials: true,
})
axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			console.error(
				'Response error:',
				error.response.status,
				error.response.data
			)
			return Promise.reject(error.response.data)
		}
		return Promise.reject(error)
	}
)

export const axiosClientMultipart = axios.create({
	baseURL: '',
	withCredentials: true,
})

axiosClientMultipart.interceptors.request.use(
	(config) => config,
	(error) => {
		return Promise.reject(error)
	}
)
