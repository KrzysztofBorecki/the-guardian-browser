import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import type { ISectionsResponseResults } from '../../types/types';

const sectionsResponseResultsList: ISectionsResponseResults[] = Array.from(new Array(10).fill(null).map((_, idx) => (
    {
        apiUrl: 'test-section',
        id: `test-section-${idx + 1}`,
        webTitle: `test-section-${idx + 1}`,
        webUrl: 'test-section',
    }
)));

describe('components/sidebar', () => {
    it('should render Sidebar component with Search Form and Sections', async () => {
        const mockSidebarProps = {
            sections: sectionsResponseResultsList,
            searchParams: new URLSearchParams({}),
            searchChange: () => 'test-search-change',
            selectSection: () => 'test-select-section',
            isLoadingSections: false,
            sectionsRequestError: false,
        }

        render(
            <Sidebar
                sectionsData={mockSidebarProps.sections}
                searchParams={mockSidebarProps.searchParams}
                onSearchChange={mockSidebarProps.searchChange}
                onClick={mockSidebarProps.selectSection}
                isLoading={mockSidebarProps.isLoadingSections}
                hasError={mockSidebarProps.sectionsRequestError}
            />
        );

        const element = screen.getByRole('searchbox', { name: /search/i });
        const sectionFirst = screen.getByText(/^test-section-1$/i);
        const sectionLast = screen.getByText(/^test-section-10$/i);

        expect(element).toBeInTheDocument();
        expect(sectionFirst).toBeInTheDocument();
        expect(sectionLast).toBeInTheDocument();
    });

    it('should render Sidebar component with Search Form and Sections Loading indicator', async () => {
        const mockSidebarProps = {
            sections: sectionsResponseResultsList,
            searchParams: new URLSearchParams({}),
            searchChange: () => 'search change',
            selectSection: () => 'select section',
            isLoadingSections: true,
            sectionsRequestError: false,
        }

        render(
            <Sidebar
                sectionsData={mockSidebarProps.sections}
                searchParams={mockSidebarProps.searchParams}
                onSearchChange={mockSidebarProps.searchChange}
                onClick={mockSidebarProps.selectSection}
                isLoading={mockSidebarProps.isLoadingSections}
                hasError={mockSidebarProps.sectionsRequestError}
            />
        );

        const element = screen.getByRole('searchbox', { name: /search/i });
        const spinnerText = screen.getByText(/finding sections.../i);
        const spinnerSvg = screen.getByAltText('spinner');

        expect(element).toBeInTheDocument();
        //https://github.com/testing-library/jest-dom/issues/202
        expect(() => screen.getByText(/^test-section-1$/i)).toThrow();
        expect(() => screen.getByText(/^test-section-10$/i)).toThrow();
        expect(spinnerText).toBeInTheDocument();
        expect(spinnerSvg).toBeInTheDocument();
    });

    it('should render Sidebar component with Search Form and Sections Error Message', async () => {

        const mockSidebarProps = {
            sections: sectionsResponseResultsList,
            searchParams: new URLSearchParams({}),
            searchChange: () => 'search change',
            selectSection: () => 'select section',
            isLoadingSections: true,
            sectionsRequestError: true,
        }

        render(
            <Sidebar
                sectionsData={mockSidebarProps.sections}
                searchParams={mockSidebarProps.searchParams}
                onSearchChange={mockSidebarProps.searchChange}
                onClick={mockSidebarProps.selectSection}
                isLoading={mockSidebarProps.isLoadingSections}
                hasError={mockSidebarProps.sectionsRequestError}
            />
        );

        const errorText = screen.getByText(/oops! something went wrong/i)

        expect(errorText).toBeInTheDocument();
    });
});