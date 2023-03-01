import { fireEvent, render, screen } from '@testing-library/react';
import Sections from './Sections';
import type { ISectionsResponseResults } from '../../types/types';
import type { ISectionsProps } from './Sections.types';

describe(`Sections`, () => {
    describe(`request succeeded`, () => {
        const sectionsResponseResultsList: ISectionsResponseResults[] = Array.from(
            new Array(10).fill(null).map((_, idx) => (
                {
                    id: `test-section-id-${idx + 1}`,
                    webTitle: `test-section-webTitle-${idx + 1}`,
                    webUrl: `test-section-webUrl-${idx + 1}`,
                }
            )));

        let mockCallback: (value: string) => void;

        beforeEach(() => {
            mockCallback = jest.fn((value: string) => value);
        });

        it(`should render component`, () => {
            const mockProps: ISectionsProps = {
                sectionsData: sectionsResponseResultsList,
                searchParams: new URLSearchParams({}),
                onClick: mockCallback,
            };

            render(
                <Sections
                    sectionsData={mockProps.sectionsData}
                    searchParams={mockProps.searchParams}
                    onClick={mockProps.onClick}
                />
            );

            const sectionsBtn = screen.getByRole('button', { name: /sections/i });
            const sectionsList = screen.getByRole('list', { name: /sections list/i });
            const sectionsBtns = screen.getAllByText(/test-section-webTitle-/i);
            const sectionFirst = screen.getByText(/^test-section-webTitle-1$/i);
            const sectionLast = screen.getByText(/^test-section-webTitle-10$/i);

            expect(sectionsBtn).toBeInTheDocument();
            expect(sectionsList).toBeInTheDocument();
            expect(sectionsBtns).toHaveLength(10);
            expect(sectionFirst).toBeInTheDocument();
            expect(sectionLast).toBeInTheDocument();
        });

        describe(`when sections list is collapsed`, () => {
            describe(`on Click event on Sections btn`, () => {
                it(`should show sections list`, () => {
                    const mockProps: ISectionsProps = {
                        sectionsData: sectionsResponseResultsList,
                        searchParams: new URLSearchParams({}),
                        onClick: mockCallback,
                    };

                    render(
                        <Sections
                            sectionsData={mockProps.sectionsData}
                            searchParams={mockProps.searchParams}
                            onClick={mockProps.onClick}
                        />
                    );

                    const sectionsBtn = screen.getByRole('button', { name: /sections/i });

                    expect(screen.getByRole('list', { name: /sections list/i })).toHaveAttribute('data-iscollapsed', 'true');

                    fireEvent(sectionsBtn, new MouseEvent('click', { bubbles: true, cancelable: true, }));

                    expect(screen.getByRole('list', { name: /sections list/i })).toHaveAttribute('data-iscollapsed', 'false');
                });
            });
        });

        describe(`when sections list is visible`, () => {
            describe(`on Click event on section list item`, () => {
                it(`should return section list item's "test-section-id" value`, () => {
                    const mockProps: ISectionsProps = {
                        sectionsData: sectionsResponseResultsList,
                        searchParams: new URLSearchParams({}),
                        onClick: mockCallback,
                    };

                    render(
                        <Sections
                            sectionsData={mockProps.sectionsData}
                            searchParams={mockProps.searchParams}
                            onClick={mockProps.onClick}
                        />
                    );

                    const sectionsBtns = screen.getAllByText(/test-section-webTitle-/i);

                    expect(sectionsBtns).toHaveLength(10);
                    expect(mockCallback).toHaveBeenCalledTimes(0);

                    fireEvent(sectionsBtns[0], new MouseEvent('click', { bubbles: true, cancelable: true, }));

                    expect(mockCallback).toHaveBeenCalledTimes(1);
                    expect(mockCallback).toHaveBeenCalledWith('test-section-id-1');
                    expect(mockCallback).toHaveReturned();
                    expect(mockCallback).toHaveReturnedWith('test-section-id-1');
                });

                it(`should set [data-selected="true"] on selected section list item`, () => {
                    const mockProps: ISectionsProps = {
                        sectionsData: sectionsResponseResultsList,
                        searchParams: new URLSearchParams({ 'section': 'test-section-id-1', 'page': '1' }),
                        onClick: mockCallback,
                    };

                    render(
                        <Sections
                            sectionsData={mockProps.sectionsData}
                            searchParams={mockProps.searchParams}
                            onClick={mockProps.onClick}
                        />
                    );

                    const sectionsBtns = screen.getAllByText(/test-section-webTitle-/i);

                    expect(sectionsBtns).toHaveLength(10);
                    expect(sectionsBtns[0]).toHaveAttribute('data-selected', 'true');

                    sectionsBtns.forEach((val, idx) => {
                        if (idx) expect(val).toHaveAttribute('data-selected', 'false');
                    });
                });
            });

            describe(`on initial render`, () => {
                it(`should set [data-selected="false"] on all section list items`, () => {
                    const mockProps: ISectionsProps = {
                        sectionsData: sectionsResponseResultsList,
                        searchParams: new URLSearchParams({}),
                        onClick: mockCallback,
                    };

                    render(
                        <Sections
                            sectionsData={mockProps.sectionsData}
                            searchParams={mockProps.searchParams}
                            onClick={mockProps.onClick}
                        />
                    );

                    const sectionsBtns = screen.getAllByText(/test-section-webTitle-/i);

                    expect(sectionsBtns).toHaveLength(10);

                    sectionsBtns.forEach((value) => expect(value).toHaveAttribute('data-selected', 'false'));
                });
            });
        });
    });
});