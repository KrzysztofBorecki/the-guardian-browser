import axios, { AxiosResponse } from 'axios';
import { httpGet } from './httpGet';
import { URL_BASE, API_KEY } from '../utils/constants';
import type { ISectionsResponseResults, ISectionsResponse, ISearchResponseResults, ISearchResponse } from '../types/types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe(`httpGet`, () => {
    const mockedSectionsResponseResults: ISectionsResponseResults = {
        id: 'test-section-id',
        webTitle: 'test-section-webTitle',
        webUrl: 'test-section-webUrl',
    };

    const mockedSectionsResponse: ISectionsResponse = {
        results: [mockedSectionsResponseResults],
    };

    const mockedAxiosSectionsResponse: AxiosResponse<{ response: ISectionsResponse }> = {
        data: { response: mockedSectionsResponse },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
    };

    const mockedSearchResponseResultsList: ISearchResponseResults[] = Array.from(new Array(21).fill(null).map((_, idx) => (
        {
            'id': `test-article-id-${idx}`,
            type: 'test-article-type',
            sectionId: 'test-article-sectionId',
            sectionName: 'test-article-sectionName',
            webPublicationDate: new Date('2023-01-01').toString(),
            webTitle: 'test-article-webTitle',
            webUrl: 'test-article-webUrl',
        }
    )));

    const mockedSearchResponse: ISearchResponse = {
        total: 21,
        startIndex: 1,
        pageSize: 10,
        currentPage: 1,
        pages: 3,
        results: mockedSearchResponseResultsList,
    };

    const mockedAxiosSearchResponse: AxiosResponse<{ response: ISectionsResponse }> = {
        data: { response: mockedSearchResponse },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
    };

    function mockedAxiosGetImplementation(url: string) {
        return new Promise((resolve, reject) => {
            if (url === `${URL_BASE}/sections`) {
                resolve(mockedAxiosSectionsResponse);
            } else if (url === `${URL_BASE}/search`) {
                resolve(mockedAxiosSearchResponse);
            } else {
                reject(new Error('request error'));
            }
        });
    }

    beforeEach(() => {
        mockedAxios.get.mockImplementationOnce(mockedAxiosGetImplementation);
    })

    describe(`call httpGet('sections')`, () => {
        it(`should resolve with ISectionsResponse type object`, async () => {
            expect(axios.get).not.toHaveBeenCalled();

            const data = await httpGet<ISectionsResponse>('sections');

            expect(axios.get).toHaveBeenCalledWith(`${URL_BASE}/sections`, {
                params: {
                    [API_KEY]: 'test',
                }
            });

            expect(data).toEqual(mockedSectionsResponse);
        });
    });

    describe(`call httpGet('search', {}) `, () => {
        it(`should resolve with ISearchResponse type object`, async () => {
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

            expect(data).toEqual(mockedSearchResponse);
        });
    });

    describe(`call httpGet('wrong-value') `, () => {
        it(`should reject with Error object`, async () => {
            expect(axios.get).not.toHaveBeenCalled();
            expect(httpGet<ISearchResponse>('wrong-value')).rejects.toThrowError('request error');
            
            expect(axios.get).toHaveBeenCalledWith(`${URL_BASE}/wrong-value`, {
                params: {
                    [API_KEY]: 'test',
                }
            });
        });
    });
});