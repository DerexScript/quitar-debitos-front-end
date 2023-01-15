import {
	getUserLocalStorage,
	setUserLocalStorage
} from '../context/AuthContext/util'
import axios, {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosHeaders
} from 'axios'

interface IAxiosResponse {
	response: AxiosResponse | undefined
	error: AxiosResponse | undefined
	axiosLoading: boolean
	status: number
	success?: boolean
	message?: string
}

export const useAxios = async (
	config: AxiosRequestConfig
): Promise<IAxiosResponse> => {
	let response: AxiosResponse | undefined
	let error: AxiosResponse | undefined
	let axiosLoading = true
	let status: number | undefined
	try {
		const axiosInstance = axios.create()
		axiosInstance.defaults.baseURL = 'http://localhost:8000/api/v1/'
		axiosInstance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				config.headers = config.headers as AxiosHeaders
				if (getUserLocalStorage()?.token) {
					config.headers.set(
						'Authorization',
						`Bearer ${getUserLocalStorage()?.token}`
					)
				}
				return config
			},
			error => Promise.reject(error)
		)
		const result = await axiosInstance.request(config)
		response = result?.data
		status = result.status
		axiosLoading = false
	} catch (e) {
		const err = e as AxiosError
		// renmove session if 401 Unauthorized
		if (err.response && err.response.status === 401) {
			const response = err.response as AxiosResponse
			if (response.data && response.data.message === 'Unauthenticated.') {
				// localStorage.removeItem('a')
				setUserLocalStorage(null)
			}
		}
		error = err.response ?? undefined
		axiosLoading = false
		status = err.response?.status || 0
	}

	return { response, error, axiosLoading, status }
}
