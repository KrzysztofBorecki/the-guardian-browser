import axios, { AxiosResponse } from 'axios';
import { httpGet } from './httpGet';
import type { ISectionsResponseResults, ISectionsResponse, ISearchResponseResults, ISearchResponse } from '../types/types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('utils/httpGet', () => {
    it('should return ISectionsResponse type object', async () => {
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

    it('should return ISectionsResponse type object', async () => {
        const searchResponseResultsList: ISearchResponseResults[] = Array.from(new Array(21).fill(null).map((_, idx) => (
            {
                'id': `test-${idx}`,
                type: 'test',
                sectionId: 'test',
                sectionName: 'test',
                webPublicationDate: 'test',
                webTitle: 'test',
                webUrl: 'test',
                apiUrl: 'test',
                isHosted: true,
                pillarId: 'test',
                pillarName: 'test',
            }
        )));

        const searchResponse: ISearchResponse = {
            status: 'test',
            total: 21,
            startIndex: 1,
            pageSize: 10,
            currentPage: 1,
            pages: 3,
            results: searchResponseResultsList,
        }

        const mockedResponse: AxiosResponse<{ response: ISectionsResponse }> = {
            data: { response: searchResponse },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        }

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);

        expect(axios.get).not.toHaveBeenCalled();

        const data = await httpGet<ISearchResponse>('search', {});

        expect(axios.get).toHaveBeenCalled();
        expect(data).toEqual(searchResponse);
    });
});