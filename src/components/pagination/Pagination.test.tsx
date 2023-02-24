import Pagination from './Pagination';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import type { IPaginationProps } from './Pagination.types'

describe(`Pagination`, () => {
    let mockedCallback: (value: number) => void;

    beforeEach(() => {
        mockedCallback = jest.fn((value: number) => value);
    });

    describe(`request succeeded`, () => {
        it(`should render Pagination`, () => {
            const props: IPaginationProps = {
                pagesAll: 11,
                pagesCurrent: 1,
                onClick: mockedCallback,
            };

            render(
                <Pagination
                    pagesAll={props.pagesAll}
                    pagesCurrent={props.pagesCurrent}
                    onClick={props.onClick}
                />
            );

            const elementPrev = screen.getByText(/previous/i);
            const elementNext = screen.getByText(/next/i);
            const expectedStartValue = screen.getByText('1');
            const expectedEndValue = screen.getByText('10');

            expect(elementPrev).toBeInTheDocument();
            expect(elementNext).toBeInTheDocument();
            expect(expectedStartValue).toBeInTheDocument();
            expect(expectedEndValue).toBeInTheDocument();
        });

        it(`should render 6 numbered buttons for 6 pages`, () => {
            const props: IPaginationProps = {
                pagesAll: 6,
                pagesCurrent: 1,
                onClick: mockedCallback,
            };

            render(
                <Pagination
                    pagesAll={props.pagesAll}
                    pagesCurrent={props.pagesCurrent}
                    onClick={props.onClick}
                />
            );

            const elementPrev = screen.getByText(/previous/i);
            const elementNext = screen.getByText(/next/i);
            const expectedStartValue = screen.getByText(/1/);
            const expectedEndValue = screen.getByText(/6/);

            expect(elementPrev).toBeInTheDocument();
            expect(elementNext).toBeInTheDocument();
            expect(expectedStartValue).toBeInTheDocument();
            expect(expectedEndValue).toBeInTheDocument();
        });

        it(`should render no more than 6 numbered for 6 pages`, () => {
            const props: IPaginationProps = {
                pagesAll: 6,
                pagesCurrent: 1,
                onClick: mockedCallback,
            };

            render(
                <Pagination
                    pagesAll={props.pagesAll}
                    pagesCurrent={props.pagesCurrent}
                    onClick={props.onClick}
                />
            );

            const elementPrev = screen.getByText(/previous/i);
            const elementNext = screen.getByText(/next/i);
            const expectedEndValue = screen.getByText(/6/);
            const unexpectedEndValue = screen.queryAllByText(/7/);

            expect(elementPrev).toBeInTheDocument();
            expect(elementNext).toBeInTheDocument();
            expect(expectedEndValue).toBeInTheDocument();
            expect(unexpectedEndValue).toHaveLength(0);
        });

        it(`should render n pages with n === pagesAll when pagesCurrent > pagesAll`, () => {
            const props: IPaginationProps = {
                pagesAll: 5,
                pagesCurrent: 11,
                onClick: mockedCallback,
            };

            render(
                <Pagination
                    pagesAll={props.pagesAll}
                    pagesCurrent={props.pagesCurrent}
                    onClick={props.onClick}
                />
            );

            const elementPrev = screen.getByText(/previous/i);
            const elementNext = screen.getByText(/next/i);
            const expectedStartValue = screen.getByText('1');
            const expectedEndValue = screen.getByText('5');

            expect(elementPrev).toBeInTheDocument();
            expect(elementNext).toBeInTheDocument();
            expect(expectedStartValue).toBeInTheDocument();
            expect(expectedEndValue).toBeInTheDocument();
        });

        describe(`on Click event on "Previous" btn`, () => {
            it(`should call mockedCallback with "1" for current page "1"`, () => {
                const props: IPaginationProps = {
                    pagesAll: 11,
                    pagesCurrent: 1,
                    onClick: mockedCallback,
                };

                render(
                    <Pagination
                        pagesAll={props.pagesAll}
                        pagesCurrent={props.pagesCurrent}
                        onClick={props.onClick}
                    />
                );

                fireEvent(screen.getByText(/previous/i), new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }));

                expect(mockedCallback).toHaveBeenCalledTimes(1);
                expect(mockedCallback).toHaveBeenCalledWith(1);
            });

            it(`should call mockedCallback with "2" for current page "3"`, () => {
                const props: IPaginationProps = {
                    pagesAll: 11,
                    pagesCurrent: 3,
                    onClick: mockedCallback,
                };

                render(
                    <Pagination
                        pagesAll={props.pagesAll}
                        pagesCurrent={props.pagesCurrent}
                        onClick={props.onClick}
                    />
                );

                fireEvent(screen.getByText(/previous/i), new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }));

                expect(mockedCallback).toHaveBeenCalledTimes(1);
                expect(mockedCallback).toHaveBeenCalledWith(2);
            });

            it(`should call mockedCallback with "10" for current page "11"`, () => {
                const props: IPaginationProps = {
                    pagesAll: 11,
                    pagesCurrent: 11,
                    onClick: mockedCallback,
                };

                render(
                    <Pagination
                        pagesAll={props.pagesAll}
                        pagesCurrent={props.pagesCurrent}
                        onClick={props.onClick}
                    />
                );

                fireEvent(screen.getByText(/previous/i), new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }));

                expect(mockedCallback).toHaveBeenCalledTimes(1);
                expect(mockedCallback).toHaveBeenCalledWith(10);
            });
        });

        describe(`on Click event on "Next" btn`, () => {
            it(`should call mockedCallback with "10" for current page "9"`, () => {
                const props: IPaginationProps = {
                    pagesAll: 11,
                    pagesCurrent: 9,
                    onClick: mockedCallback,
                };

                render(
                    <Pagination
                        pagesAll={props.pagesAll}
                        pagesCurrent={props.pagesCurrent}
                        onClick={props.onClick}
                    />
                );

                fireEvent(screen.getByText(/next/i), new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }));

                expect(mockedCallback).toHaveBeenCalledTimes(1);
                expect(mockedCallback).toHaveBeenCalledWith(10);
            });

            it(`should call mockedCallback with "11" for current page "10"`, () => {
                const props: IPaginationProps = {
                    pagesAll: 11,
                    pagesCurrent: 10,
                    onClick: mockedCallback,
                };

                render(
                    <Pagination
                        pagesAll={props.pagesAll}
                        pagesCurrent={props.pagesCurrent}
                        onClick={props.onClick}
                    />
                );

                fireEvent(screen.getByText(/next/i), new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }));

                expect(mockedCallback).toHaveBeenCalledTimes(1);
                expect(mockedCallback).toHaveBeenCalledWith(11);
            });

            it(`should call mockedCallback with "10" for current page "10" === pagesAll`, () => {
                const props: IPaginationProps = {
                    pagesAll: 10,
                    pagesCurrent: 10,
                    onClick: mockedCallback,
                };

                render(
                    <Pagination
                        pagesAll={props.pagesAll}
                        pagesCurrent={props.pagesCurrent}
                        onClick={props.onClick}
                    />
                );

                fireEvent(screen.getByText(/next/i), new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }));

                expect(mockedCallback).toHaveBeenCalledTimes(1);
                expect(mockedCallback).toHaveBeenCalledWith(10);
            });
        });

        describe(`on CLick event on btn with page number`, () => {
            it(`should call mockedCallback with a value === displayed number`, () => {
                const props: IPaginationProps = {
                    pagesAll: 11,
                    pagesCurrent: 10,
                    onClick: mockedCallback,
                };

                render(
                    <Pagination
                        pagesAll={props.pagesAll}
                        pagesCurrent={props.pagesCurrent}
                        onClick={props.onClick}
                    />
                );

                fireEvent(screen.getByText(/5/i), new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }));

                expect(mockedCallback).toHaveBeenCalledTimes(1);
                expect(mockedCallback).toHaveBeenCalledWith(5);
            });
        });
    });
});