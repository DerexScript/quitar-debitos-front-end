import { getUserLocalStorage } from '../context/AuthContext/util';
import axios, {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosHeaders
} from 'axios';

interface IAxiosResponse {
	response: AxiosResponse | undefined;
	error: AxiosResponse | undefined;
	axiosLoading: boolean;
}

export const useAxios = async (
	config: AxiosRequestConfig
): Promise<IAxiosResponse> => {
	let response: AxiosResponse | undefined;
	let error: AxiosResponse | undefined;
	let axiosLoading = true;
	try {
		const axiosInstance = axios.create();
		axiosInstance.defaults.baseURL = 'http://localhost:8000/api/v1/';
		axiosInstance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				config.headers = config.headers as AxiosHeaders;
				if (!!getUserLocalStorage()?.token) {
					config.headers.set(
						'Authorization',
						`Bearer ${getUserLocalStorage()?.token}`
					);
				}
				return config;
			},
			error => Promise.reject(error)
		);
		const result = await axiosInstance.request(config);
		response = result?.data;
		axiosLoading = false;
	} catch (e) {
		const err = e as AxiosError;
		error = err.response ?? undefined;
		axiosLoading = false;
	}

	return { response, error, axiosLoading };
};
