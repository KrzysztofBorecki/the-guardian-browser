import axios, { AxiosResponse } from 'axios';
import { URL_BASE, API_KEY, API_KEY_NUMBER } from './data';
import type { DataResponse } from '../types/types';

export async function httpGet(url: string, params?: Record<string, string>) {
    // Record -> typ Record<K, T> -> typ OBIEKTU -> gdzie: K === typ kluczy; T === typ wartości 
    try {
        const response: AxiosResponse<DataResponse> = await axios(
        // zamiast pisać ręcznie - użyto AxiosResponse - typu dostarczanego przez Axios -> będącego generykiem
        // const response: ResponseAxios = await axios(
            {
                baseURL: URL_BASE,
                url,
                params: {
                    ...params,
                    [API_KEY]: API_KEY_NUMBER,
                  }
            }
        );
        console.log('httpGet')
        console.log('200');

        if(params) {
            console.log('params:');
            console.log(params);
        }
        
        console.log(response);
        
        return response.data.response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);

            return error.message;
        } else {
            console.log('unexpected error: ', error);

            return 'An unexpected error occurred';
        }
    }
}