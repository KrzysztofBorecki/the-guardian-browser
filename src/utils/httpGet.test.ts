import axios, { AxiosResponse } from 'axios';
import { httpGet } from './httpGet';

jest.mock('axios');

import type { ISectionsResponseResults, ISectionsResponse } from '../types/types';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('utils/httpGet', () => {
    test('httpGet returns ISectionsResponse type object', async () => {
        const sectionsResponseResults: ISectionsResponseResults = {
            apiUrl: 'test',
            id: 'test',
            webTitle: 'test',
            webUrl: 'test',
        }

        const sectionsResponse: ISectionsResponse = {
            results: [sectionsResponseResults],
        }

        const mockedResponse: AxiosResponse<{ response: ISectionsResponse }> = {
            data: { response: sectionsResponse },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        }

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);

        expect(axios.get).not.toHaveBeenCalled();

        const data = await httpGet<ISectionsResponse>('sections');
        
        expect(axios.get).toHaveBeenCalled();
        expect(data).toEqual(sectionsResponse);
    });
});

