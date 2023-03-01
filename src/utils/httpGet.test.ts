import axios, { AxiosResponse } from 'axios';
import { httpGet } from './httpGet';
import { URL_BASE, API_KEY } from '../utils/constants';
import type { ISectionsResponse, ISearchResponse } from '../types/types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe(`httpGet`, () => {
    const mockedAxiosResponse: AxiosResponse<{ response: string }> = {
        data: { response: 'dummy response' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
    };

    function mockedAxiosGetImplementation() {
        return Promise.resolve(mockedAxiosResponse);
    }

    beforeEach(() => {
        mockedAxios.get.mockImplementationOnce(mockedAxiosGetImplementation);
    });

    describe(`when called with 1 argument - required`, () => {
        it(`should resolve with response.data object`, async () => {
            expect(axios.get).not.toHaveBeenCalled();

            const data = await httpGet<ISectionsResponse>('sections');

            expect(axios.get).toHaveBeenCalledWith(`${URL_BASE}/sections`, {
                params: {
                    [API_KEY]: 'test',
                }
            });

            expect(data).toEqual(mockedAxiosResponse.data);
        });
    });

    describe(`when called with 2 arguments - required and optional`, () => {
        it(`should resolve with response.data object`, async () => {
            expect(axios.get).not.toHaveBeenCalled();

            const data = await httpGet<ISearchResponse>('search', {
                q: 'test',
                page: '10',
            });

            expect(axios.get).toHaveBeenCalledWith(`${URL_BASE}/search`, {
                params: {
                    [API_KEY]: 'test',
                    page: '10',
                    q: 'test',
                }
            });

            expect(data).toEqual(mockedAxiosResponse.data);
        });
    });
});