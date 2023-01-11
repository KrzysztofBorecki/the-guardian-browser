import axios, { AxiosResponse } from 'axios';
import { URL_BASE, API_KEY, API_KEY_NUMBER } from './constants';

export async function httpGet<T>(url: string, params?: Record<string, string>) {
    const response: AxiosResponse<{ response: T }> = await axios(
        {
            baseURL: URL_BASE,
            url,
            params: {
                ...params,
                [API_KEY]: API_KEY_NUMBER,
            }
        }
    );

    return response.data.response;
}