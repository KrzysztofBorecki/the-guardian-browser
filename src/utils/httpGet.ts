import axios, { AxiosResponse } from 'axios';
import { URL_BASE, API_KEY, API_KEY_NUMBER } from './data';
import type { DataResponse } from '../types/types';

export async function httpGet(url: string, params?: Record<string, string>) {
    const response: AxiosResponse<DataResponse> = await axios(
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