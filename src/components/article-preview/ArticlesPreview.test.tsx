import { render, screen, fireEvent } from '@testing-library/react';
import ArticlePreview from './ArticlePreview';
import type { ISearchResponseResultsMocked } from '../../types/types'

describe('components/article-preview', () => {
    it('should render single ArticlesPreview component', async () => {
        const obj: ISearchResponseResultsMocked = {
            id: 'test-article-preview',
            type: 'test-article-preview',
            sectionId: 'test-article-preview',
            sectionName: 'test-article-preview',
            webPublicationDate: 'test-article-preview',
            webTitle: 'test-article-preview',
            webUrl: 'test-article-preview',
            apiUrl: 'test-article-preview',
            isHosted: true,
            pillarId: 'test-article-preview',
            pillarName: 'test-article-preview',
            author: {
                name: 'test-name',
                avatar: 'test-avatar'
            },
            text: 'test-article-preview',
        }

        render(
            <ArticlePreview key={obj.id} {...obj} />
        );

        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
    });

    it('should return "null" on "Read more" click event', () => {
        const mockSearchResponseResultsMocked: ISearchResponseResultsMocked = {
            id: 'test-article-preview',
            type: 'test-article-preview',
            sectionId: 'test-article-preview',
            sectionName: 'test-article-preview',
            webPublicationDate: 'test-article-preview',
            webTitle: 'test-article-preview',
            webUrl: 'test-article-preview',
            apiUrl: 'test-article-preview',
            isHosted: true,
            pillarId: 'test-article-preview',
            pillarName: 'test-article-preview',
            author: {
                name: 'test-name',
                avatar: 'test-avatar'
            },
            text: 'test-article-preview',
        }

        const mockWindowOpen = jest.spyOn(window, 'open');

        mockWindowOpen.mockImplementation(() => null);

        render(
            <ArticlePreview key={mockSearchResponseResultsMocked.id} {...mockSearchResponseResultsMocked} />
        );

        fireEvent(screen.getByText(/read more/i), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));

        expect(mockWindowOpen).toHaveBeenCalledTimes(1);
        expect(mockWindowOpen).toReturnWith(null);
    })
});