import { render, screen, fireEvent } from '@testing-library/react';
import ArticlePreview from './ArticlePreview';
import type { ISearchResponseResultsMocked } from '../../types/types'

describe(`ArticlePreview`, () => {
    const mockedSearchResponseResultsMocked: ISearchResponseResultsMocked = {
        id: 'test-article-id',
        type: 'test-article-type',
        sectionId: 'test-article-sectionId',
        sectionName: 'test-article-sectionName',
        webPublicationDate: new Date('2023-01-01').toString(),
        webTitle: 'test-article-webTitle',
        webUrl: 'https://test-article-webUrl.com',
        author: {
            name: 'test-article-author-name',
            avatar: 'test-article-author-avatar',
        },
        text: 'test-article-text',
    };

    it(`should render component`, () => {
        render(
            <ArticlePreview
                key={mockedSearchResponseResultsMocked.id}
                {...mockedSearchResponseResultsMocked}
            />
        );

        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByText(mockedSearchResponseResultsMocked.sectionName.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(/01 Jan 2023/i)).toBeInTheDocument();
        expect(screen.getByText(mockedSearchResponseResultsMocked.webTitle)).toBeInTheDocument();
        expect(screen.getByAltText(/avatar/)).toBeInTheDocument();
        expect(screen.getByText(mockedSearchResponseResultsMocked.author.name)).toBeInTheDocument();
        expect(screen.getByText(mockedSearchResponseResultsMocked.text)).toBeInTheDocument();
    });

    it(`should set right href on Article card HTMLAnchorElement`, () => {
        render(
            <ArticlePreview
                key={mockedSearchResponseResultsMocked.id}
                {...mockedSearchResponseResultsMocked}
            />
        );

        fireEvent(screen.getByRole('link'), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));

        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://test-article-webUrl.com');
    });

    describe(`clicking on Read more btn`, () => {
        it(`should open linked page in new window`, () => {
            const mockedWindowOpen = jest.spyOn(window, 'open');

            jest.spyOn(window, 'open').mockImplementation(() => null);

            render(
                <ArticlePreview
                    key={mockedSearchResponseResultsMocked.id}
                    {...mockedSearchResponseResultsMocked}
                />
            );

            fireEvent(screen.getByText(/read more/i), new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }));

            expect(mockedWindowOpen).toHaveBeenCalledTimes(1);
            expect(mockedWindowOpen).toReturnWith(null);
        });
    });
});