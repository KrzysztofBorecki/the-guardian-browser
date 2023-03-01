import { render, screen, act, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import * as httpGetModule from '../../utils/httpGet';
import { httpGet } from '../../utils/httpGet';
import App from './App';
import { PAGE_NUMBER_DEFAULT } from '../../utils/constants';
import type { ISectionsResponseResults, ISectionsResponse, ISearchResponseResults, ISearchResponse } from '../../types/types';

describe(`App`, () => {
    beforeAll(() => {
        window.scrollTo = jest.fn();
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    const mockedSectionsResponseResultsList: ISectionsResponseResults[] = Array.from(new Array(20).fill(null).map((_, idx) => (
        {
            id: `test-section-id-${idx + 1}`,
            webTitle: `test-section-webTitle-${idx + 1}`,
            webUrl: 'test-section-webUrl',
        }
    )));

    const mockedSectionsResponse: ISectionsResponse = {
        results: mockedSectionsResponseResultsList,
    };

    const mockedAxiosResponseForSections = {
        data: {
            response: mockedSectionsResponse,
        },
    }

    const mockedSearchResponseResultsList: ISearchResponseResults[] = Array.from(new Array(10).fill(null).map((_, idx) => (
        {
            id: `test-article-id-${idx + 1}`,
            type: 'test-article-type',
            sectionId: 'test-article-sectionId',
            sectionName: 'test-article-sectionName',
            webPublicationDate: new Date('2023-01-01').toString(),
            webTitle: 'test-article-webTitle',
            webUrl: 'test-article-webUrl',
        }
    )));

    const mockedSearchResponse: ISearchResponse = {
        total: 101,
        startIndex: 1,
        pageSize: 10,
        currentPage: 1,
        pages: 11,
        results: mockedSearchResponseResultsList,
    };

    const mockedAxiosResponseForSearch = {
        data: {
            response: mockedSearchResponse,
        },
    }

    describe(`requests failed`, () => {
        it(`should render "sections" and "search" loading error indication`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation(() => {
                return Promise.reject(new Error('test-error'));
            });

            render(
                <MemoryRouter initialEntries={['']}>
                    <App />
                </MemoryRouter>
            );

            expect(httpGet).toHaveBeenCalledTimes(2);
            expect(httpGet).toHaveBeenNthCalledWith(1, 'sections');
            expect(httpGet).toHaveBeenNthCalledWith(2, 'search', {});
            expect(httpGet).rejects.toThrowError(new Error('test-error'));
            expect(httpGet).rejects.not.toThrowError(new Error('test-errorXYZ'));
            expect(await screen.findAllByText(/Oops! Something went wrong/i)).toHaveLength(2);
        });
    });

    describe(`requests pending`, () => {
        it(`should render "sections" and "articles" loading indication`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation((url: string, params?: Record<string, string>) => {
                  return (url === 'sections') ?
                      new Promise(resolve => setTimeout(() => resolve(mockedAxiosResponseForSections.data), 1000)) :
                      new Promise(resolve => setTimeout(() => resolve(mockedAxiosResponseForSearch.data), 500));
              });
  
            render(
              <MemoryRouter initialEntries={['']}>
                <App />
              </MemoryRouter>
            );
  
            const loadingArticles = await screen.findByText(/searching for articles/i);
            const loadingSections = await screen.findByText(/finding sections/i);
  
            expect(loadingArticles).toBeInTheDocument();
            expect(loadingSections).toBeInTheDocument();
  
            await waitForElementToBeRemoved(() => screen.getByText(/searching for articles/i));
            await waitForElementToBeRemoved(() => screen.getByText(/finding sections/i));
          });
    });

    describe(`requests successful`, () => {
        it(`should render complete App component`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation((url: string, params?: Record<string, string>) => {
                return (url === 'sections') ? Promise.resolve(mockedAxiosResponseForSections.data) : Promise.resolve(mockedAxiosResponseForSearch.data);
            });

            render(
                <MemoryRouter initialEntries={['']}>
                    <App />
                </MemoryRouter>
            );

            const searchForm = await screen.findByRole('form');
            const searchbox = await screen.findByRole('searchbox', { name: /search/i });
            const submit = await screen.findByRole('button', { name: /find/i });
            const resetArticles = await screen.findByRole('button', { name: /all articles/i });
            const resetSections = await screen.findByRole('button', { name: /all sections/i });
            const sectionsBtn = await screen.findByRole('button', { name: /^sections$/i });
            const sectionsList = await screen.findByRole('list', { name: /sections list/i });
            const sectionsBtns = await screen.findAllByText(/test-section-webTitle/i);
            const articles = await screen.findAllByRole('link');
            const elementPrev = await screen.findByText(/previous/i);
            const elementNext = await screen.findByText(/next/i);
            const expectedStartValue = await screen.findByText('1');
            const expectedEndValue = await screen.findByText('10');

            expect(searchForm).toBeInTheDocument();
            expect(searchbox).toBeInTheDocument();
            expect(submit).toBeInTheDocument();
            expect(resetArticles).toBeInTheDocument();
            expect(resetSections).toBeInTheDocument();
            expect(sectionsBtn).toBeInTheDocument();
            expect(sectionsList).toBeInTheDocument();
            expect(sectionsBtns).toHaveLength(20);
            expect(articles).toHaveLength(10);
            expect(elementPrev).toBeInTheDocument();
            expect(elementNext).toBeInTheDocument();
            expect(expectedStartValue).toBeInTheDocument();
            expect(expectedEndValue).toBeInTheDocument();
        });
    });

    describe(`on Change event on searchbox`, () => {
        it(`should change searchbox input value to 'test-search-phrase'`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation((url: string, params?: Record<string, string>) => {
                return (url === 'sections') ? Promise.resolve(mockedAxiosResponseForSections.data) : Promise.resolve(mockedAxiosResponseForSearch.data);
            });

            render(
                <MemoryRouter initialEntries={['']}>
                    <App />
                </MemoryRouter>
            );

            const searchbox: HTMLInputElement = await screen.findByRole('searchbox', { name: /search/i });

            fireEvent.change(searchbox, { target: { value: 'test-search-phrase' } });

            await waitFor(() => expect(searchbox.value).toBe('test-search-phrase'));
        });
    });

    describe(`on Submit event on search form`, () => {
        it(`should make search requests and re-render App with new data`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation((url: string, params?: Record<string, string>) => {
                return (url === 'sections') ? Promise.resolve(mockedAxiosResponseForSections.data) : Promise.resolve(mockedAxiosResponseForSearch.data);
            });

            render(
                <MemoryRouter initialEntries={['']}>
                    <App />
                </MemoryRouter>
            );

            const searchForm = await screen.findByRole('form');
            const searchbox: HTMLInputElement = await screen.findByRole('searchbox', { name: /search/i });

            fireEvent.change(searchbox, { target: { value: 'test-search-phrase' } });
            fireEvent.submit(searchForm);

            await waitFor(() => expect(searchbox.value).toBe('test-search-phrase'));
            await waitFor(() => expect(httpGet).toHaveBeenNthCalledWith(3, 'search', { 'q': 'test-search-phrase', 'page': PAGE_NUMBER_DEFAULT }));
        });
    });

    describe(`on Click event on all articles (reset) btn`, () => {
        it(`should make search requests and re-render App with new data`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation((url: string, params?: Record<string, string>) => {
                return (url === 'sections') ? Promise.resolve(mockedAxiosResponseForSections.data) : Promise.resolve(mockedAxiosResponseForSearch.data);
            });

            render(
                <MemoryRouter initialEntries={['']}>
                    <App />
                </MemoryRouter>
            );

            const resetArticles = await screen.findByRole('button', { name: /all articles/i });

            fireEvent.click(resetArticles);

            await waitFor(() => expect(httpGet).toHaveBeenNthCalledWith(3, 'search', { 'page': PAGE_NUMBER_DEFAULT }));
            await waitFor(() => expect(httpGet).not.toHaveBeenNthCalledWith(3, 'search', { 'section': '', 'page': PAGE_NUMBER_DEFAULT }));
            await waitFor(() => expect(httpGet).not.toHaveBeenNthCalledWith(3, 'search', { 'q': '', 'section': '', 'page': PAGE_NUMBER_DEFAULT }));
        });
    });

    describe(`on Click event on all sections (reset) btn`, () => {
        it(`should make search requests and re-render App with new data`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation((url: string, params?: Record<string, string>) => {
                return (url === 'sections') ? Promise.resolve(mockedAxiosResponseForSections.data) : Promise.resolve(mockedAxiosResponseForSearch.data);
            });

            render(
                <MemoryRouter initialEntries={['']}>
                    <App />
                </MemoryRouter>
            );

            const resetSections = await screen.findByRole('button', { name: /all sections/i });

            fireEvent.click(resetSections);

            await waitFor(() => expect(httpGet).toHaveBeenNthCalledWith(3, 'search', { 'page': PAGE_NUMBER_DEFAULT }));
            await waitFor(() => expect(httpGet).not.toHaveBeenNthCalledWith(3, 'search', { 'section': '', 'page': PAGE_NUMBER_DEFAULT }));
        });
    });

    describe(`on Click event on section btn`, () => {
        it(`should make search requests and re-render App with new data`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation((url: string, params?: Record<string, string>) => {
                return (url === 'sections') ? Promise.resolve(mockedAxiosResponseForSections.data) : Promise.resolve(mockedAxiosResponseForSearch.data);
            });

            render(
                <MemoryRouter initialEntries={['']}>
                    <App />
                </MemoryRouter>
            );

            await waitFor(() => expect(httpGet).toHaveBeenCalledTimes(2));

            const sectionsBtns = await screen.findAllByText(/test-section-webTitle/i);

            fireEvent.click(sectionsBtns[1]);

            await waitFor(() => expect(httpGet).toHaveBeenCalledTimes(3));
            await waitFor(() => expect(httpGet).toHaveBeenNthCalledWith(3, 'search', 
                { 'section': 'test-section-id-2', 'page': PAGE_NUMBER_DEFAULT }));
        });
    });

    describe(`on Click event on pagination page number btn`, () => {
        it(`should make search requests and re-render App with new data`, async () => {
            jest.spyOn(httpGetModule, 'httpGet').mockImplementation((url: string, params?: Record<string, string>) => {
                return (url === 'sections') ? Promise.resolve(mockedAxiosResponseForSections.data) : Promise.resolve(mockedAxiosResponseForSearch.data);
            });

            render(
                <MemoryRouter initialEntries={['']}>
                    <App />
                </MemoryRouter>
            );

            const articlesBase = await screen.findAllByText(/test-article-webTitle/i);

            expect(articlesBase).toHaveLength(10);

            const paginationBtn = await screen.findByText('5');

            fireEvent.click(paginationBtn);

            await waitFor(() => expect(httpGet).toHaveBeenCalledTimes(3));
            await waitFor(() => expect(httpGet).toHaveBeenNthCalledWith(3, 'search', { 'page': '5' }));

            const articlesReq = await screen.findAllByText(/test-article-webTitle/i);

            await waitFor(() => expect(articlesReq).toHaveLength(10));
        });
    });
});
