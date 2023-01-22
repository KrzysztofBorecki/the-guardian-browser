import { render, screen } from '@testing-library/react';
import ArticlesList from './ArticlesList';
import type { ISearchResponseResultsMocked, ISearchResponseMocked } from '../../types/types'
import type { IArticlesListProps } from './ArticlesList.types';
import { PAGE_TITLE } from '../../utils/constants';

describe(`ArticlesList`, () => {
    describe(`loading data`, () => {
        function getMockedSearchResponseResultsMocked(value: number): ISearchResponseResultsMocked {
            return {
                id: `test-article-id-${value}`,
                type: 'test-article-type',
                sectionId: 'test-article-sectionId',
                sectionName: 'test-article-sectionName',
                webPublicationDate: new Date('2023-01-01').toString(),
                webTitle: `test-article-webTitle-${value}`,
                webUrl: 'test-article-webUrl',
                author: {
                    name: 'test-article-author-name',
                    avatar: 'test-article-author-avatar',
                },
                text: 'test-article-text',
            }
        }

        function mockedCallback(value: number) { value };

        describe(`request failed`, () => {
            it(`should render component with "no results" message`, () => {
                const mockedSearchResponseMocked: ISearchResponseMocked = {
                    currentPage: 1,
                    pages: 101,
                    results: [],
                };

                const mockedArticlesListProps: IArticlesListProps = {
                    title: PAGE_TITLE,
                    data: mockedSearchResponseMocked,
                    onClick: mockedCallback,
                };

                render(
                    <ArticlesList
                        title={mockedArticlesListProps.title}
                        data={mockedArticlesListProps.data}
                        onClick={mockedArticlesListProps.onClick}
                    />
                );

                expect(screen.getByText(/sorry! no results found!/i)).toBeInTheDocument();
            });

            it(`should render component without pagination`, () => {
                const mockedSearchResponseMocked: ISearchResponseMocked = {
                    currentPage: 1,
                    pages: 101,
                    results: [],
                };

                const mockedArticlesListProps: IArticlesListProps = {
                    title: PAGE_TITLE,
                    data: mockedSearchResponseMocked,
                    onClick: mockedCallback,
                };

                render(
                    <ArticlesList
                        title={mockedArticlesListProps.title}
                        data={mockedArticlesListProps.data}
                        onClick={mockedArticlesListProps.onClick}
                    />
                );

                expect(() => screen.getByText(/previous/i)).toThrow();
                expect(() => screen.getByText(/next/i)).toThrow();
                expect(() => screen.getByText("1")).toThrow();
                expect(() => screen.getByText("10")).toThrow();
            })
        });

        describe(`request succeded`, () => {
            it(`should render component with results`, () => {
                const mockedSearchResponseMocked: ISearchResponseMocked = {
                    currentPage: 1,
                    pages: 101,
                    results: Array.from(new Array(10).fill(null).map((_, idx) => getMockedSearchResponseResultsMocked(idx + 1))),
                };

                const mockedArticlesListProps: IArticlesListProps = {
                    title: PAGE_TITLE,
                    data: mockedSearchResponseMocked,
                    onClick: mockedCallback,
                };

                render(
                    <ArticlesList
                        title={mockedArticlesListProps.title}
                        data={mockedArticlesListProps.data}
                        onClick={mockedArticlesListProps.onClick}
                    />
                );

                expect(screen.getAllByRole('link')).toHaveLength(10);
                expect(screen.getAllByText(/test-article-sectionName/i)).toHaveLength(10);
                expect(screen.getAllByText(/01 Jan 2023/i)).toHaveLength(10);
                expect(screen.getAllByText(/test-article-webTitle/i)).toHaveLength(10);
                expect(screen.getAllByAltText(/avatar/i)).toHaveLength(10);
                expect(screen.getAllByText(/test-article-author-name/i)).toHaveLength(10);
                expect(screen.getAllByText(/test-article-text/i)).toHaveLength(10);
            });

            it(`should render component with pagination`, () => {
                const mockedSearchResponseMocked: ISearchResponseMocked = {
                    currentPage: 1,
                    pages: 101,
                    results: Array.from(new Array(10).fill(null).map((_, idx) => getMockedSearchResponseResultsMocked(idx + 1))),
                };

                const mockedArticlesListProps: IArticlesListProps = {
                    title: PAGE_TITLE,
                    data: mockedSearchResponseMocked,
                    onClick: mockedCallback,
                };

                render(
                    <ArticlesList
                        title={mockedArticlesListProps.title}
                        data={mockedArticlesListProps.data}
                        onClick={mockedArticlesListProps.onClick}
                    />
                );

                const elementPrev = screen.getByText(/previous/i);
                const elementNext = screen.getByText(/next/i);
                const expectedStartValue = screen.getByText("1");
                const expectedEndValue = screen.getByText("10");

                expect(elementPrev).toBeInTheDocument();
                expect(elementNext).toBeInTheDocument();
                expect(expectedStartValue).toBeInTheDocument();
                expect(expectedEndValue).toBeInTheDocument();
            });
        });
    });
});