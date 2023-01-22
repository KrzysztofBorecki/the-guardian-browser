import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import type { ISectionsResponseResults } from '../../types/types';

describe(`Sidebar`, () => {
    const mockedSectionsResponseResultsList: ISectionsResponseResults[] = Array.from(new Array(10).fill(null).map((_, idx) => (
        {
            id: `test-section-id-${idx + 1}`,
            webTitle: `test-section-webTitle-${idx + 1}`,
            webUrl: `test-section-webUrl-${idx + 1}`,
        }
    )));

    describe(`request succeded`, () => {
        it(`should render component with sections list`, () => {
            const mockedSidebarProps = {
                sections: mockedSectionsResponseResultsList,
                searchParams: new URLSearchParams({}),
                searchChange: () => 'test-search-change',
                selectSection: () => 'test-select-section',
                isLoadingSections: false,
                sectionsRequestError: false,
            };

            render(
                <Sidebar
                    sectionsData={mockedSidebarProps.sections}
                    searchParams={mockedSidebarProps.searchParams}
                    onSearchChange={mockedSidebarProps.searchChange}
                    onClick={mockedSidebarProps.selectSection}
                    isLoading={mockedSidebarProps.isLoadingSections}
                    hasError={mockedSidebarProps.sectionsRequestError}
                />
            );

            const searchForm = screen.getByRole('form');
            const searchbox = screen.getByRole('searchbox', { name: /search/i });
            const submit = screen.getByRole('button', { name: /find/i });
            const resetArticles = screen.getByRole('button', { name: /all articles/i });
            const resetSections = screen.getByRole('button', { name: /all sections/i });
            const sectionsBtn = screen.getByRole('button', { name: /^sections$/i })
            const sectionsList = screen.getByRole('list', { name: /sections list/i });
            const sectionsBtns = screen.getAllByText(/test-section-webTitle-/i);
            const sectionFirst = screen.getByText(/^test-section-webTitle-1$/i);
            const sectionLast = screen.getByText(/^test-section-webTitle-10$/i);

            expect(searchForm).toBeInTheDocument();
            expect(searchbox).toBeInTheDocument();
            expect(submit).toBeInTheDocument();
            expect(resetArticles).toBeInTheDocument();
            expect(resetSections).toBeInTheDocument();
            expect(sectionsBtn).toBeInTheDocument();
            expect(sectionsList).toBeInTheDocument();
            expect(sectionsBtns).toHaveLength(10);
            expect(sectionFirst).toBeInTheDocument();
            expect(sectionLast).toBeInTheDocument();
        });
    });

    describe(`request pending`, () => {
        it(`should render component with Loading indicator`, () => {
            const mockedSidebarProps = {
                sections: mockedSectionsResponseResultsList,
                searchParams: new URLSearchParams({}),
                searchChange: () => 'search change',
                selectSection: () => 'select section',
                isLoadingSections: true,
                sectionsRequestError: false,
            };

            render(
                <Sidebar
                    sectionsData={mockedSidebarProps.sections}
                    searchParams={mockedSidebarProps.searchParams}
                    onSearchChange={mockedSidebarProps.searchChange}
                    onClick={mockedSidebarProps.selectSection}
                    isLoading={mockedSidebarProps.isLoadingSections}
                    hasError={mockedSidebarProps.sectionsRequestError}
                />
            );

            const searchForm = screen.getByRole('form');
            const searchbox = screen.getByRole('searchbox', { name: /search/i });
            const submit = screen.getByRole('button', { name: /find/i });
            const resetArticles = screen.getByRole('button', { name: /all articles/i });
            const resetSections = screen.getByRole('button', { name: /all sections/i });
            const spinnerText = screen.getByText(/finding sections.../i);
            const spinnerSvg = screen.getByAltText('spinner');

            expect(searchForm).toBeInTheDocument();
            expect(searchbox).toBeInTheDocument();
            expect(submit).toBeInTheDocument();
            expect(resetArticles).toBeInTheDocument();
            expect(resetSections).toBeInTheDocument();
            expect(() => screen.getByRole('button', { name: /^sections$/i })).toThrow();
            expect(() => screen.getByRole('list', { name: /sections list/i })).toThrow();
            expect(() => screen.getAllByText(/test-section-webTitle-/i)).toThrow();
            expect(() => screen.getByText(/^test-section-webTitle-1$/i)).toThrow();
            expect(() => screen.getByText(/^test-section-webTitle-10$/i)).toThrow();
            expect(spinnerText).toBeInTheDocument();
            expect(spinnerSvg).toBeInTheDocument();
        });
    });

    describe(`request failed`, () => {
        it(`should render component with Error message`, () => {
            const mockedSidebarProps = {
                sections: mockedSectionsResponseResultsList,
                searchParams: new URLSearchParams({}),
                searchChange: () => 'search change',
                selectSection: () => 'select section',
                isLoadingSections: true,
                sectionsRequestError: true,
            };

            render(
                <Sidebar
                    sectionsData={mockedSidebarProps.sections}
                    searchParams={mockedSidebarProps.searchParams}
                    onSearchChange={mockedSidebarProps.searchChange}
                    onClick={mockedSidebarProps.selectSection}
                    isLoading={mockedSidebarProps.isLoadingSections}
                    hasError={mockedSidebarProps.sectionsRequestError}
                />
            );

            const searchForm = screen.getByRole('form');
            const searchbox = screen.getByRole('searchbox', { name: /search/i });
            const submit = screen.getByRole('button', { name: /find/i });
            const resetArticles = screen.getByRole('button', { name: /all articles/i });
            const resetSections = screen.getByRole('button', { name: /all sections/i });
            const errorMsg = screen.getByText(/oops! something went wrong/i);

            expect(searchForm).toBeInTheDocument();
            expect(searchbox).toBeInTheDocument();
            expect(submit).toBeInTheDocument();
            expect(resetArticles).toBeInTheDocument();
            expect(resetSections).toBeInTheDocument();
            expect(() => screen.getByRole('button', { name: /^sections$/i })).toThrow();
            expect(() => screen.getByRole('list', { name: /sections list/i })).toThrow();
            expect(() => screen.getAllByText(/test-section-webTitle-/i)).toThrow();
            expect(() => screen.getByText(/^test-section-webTitle-1$/i)).toThrow();
            expect(() => screen.getByText(/^test-section-webTitle-10$/i)).toThrow();
            expect(searchbox).toBeInTheDocument();
            expect(errorMsg).toBeInTheDocument();
        });
    });
});