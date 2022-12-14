import { ReactElement, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE_TITLE, getAuthors, PAGE_NUMBER_DEFAULT } from '../../utils/data';
import { httpGet } from '../../utils/httpGet';
import Sidebar from '../sidebar/Sidebar';
import Results from '../results/Results';
import Spinner from '../spinner/Spinner';
import type { SectionsResponseResults, SearchResponse, Author } from '../../types/types';

export default function App(): ReactElement {
    const [sections, setSections] = useState<SectionsResponseResults[] | null>(null);
    const [articles, setArticles] = useState<SearchResponse | null>(null);
    const [authors, setAuthors] = useState<Author[]>(getAuthors());
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoadingArticles, setIsLoadingArticles] = useState<true | false>(false);
    const [isLoadingSections, setIsLoadingSections] = useState<true | false>(false);
    const [hasErrorArticles, setHasErrorArticles] = useState<true | false>(false);
    const [hasErrorSections, setHasErrorSections] = useState<true | false>(false);

    function handleSubmit(searchPhrase: string): void {
        if (!searchPhrase) return;

        setSearchParams({ q: searchPhrase, page: PAGE_NUMBER_DEFAULT });
    }

    function handleReset() {
        setSearchParams({ page: PAGE_NUMBER_DEFAULT });
    }

    function handleClick(section: string) {
        setSearchParams({ section });
    }

    function handlePageChange(value: number) {
        const page = value.toString();
        const searchObject = Object.fromEntries(searchParams.entries());
        setSearchParams({...searchObject, page});
    }

    useEffect(() => {
        setIsLoadingSections(true);
        setHasErrorSections(false);

        httpGet('sections').then(
            (value) => {
                if (!value || (typeof value === 'string') || ('pages' in value)) return;

                setSections(value.results);
                setIsLoadingSections(false);
            },
            () => {
                setIsLoadingSections(false);
                setHasErrorSections(true);
            }
        );
    }, []);

    useEffect(() => {
        setIsLoadingArticles(true);
        setHasErrorArticles(false);

        httpGet('search', Object.fromEntries(searchParams)).then(
            (value) => {
                if (!value || (typeof value === 'string') || !('pages' in value)) return;

                setAuthors(getAuthors());
                setArticles(value)
                setIsLoadingArticles(false);
            },
            () => {
                setIsLoadingArticles(false);
                setHasErrorArticles(true);
            }
        );
    }, [searchParams]);

    return (
        <div className='app'>
            {
                <Sidebar
                    sectionsData={sections}
                    searchParams={searchParams}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    onClick={handleClick}
                    isLoading={isLoadingSections}
                    hasError={hasErrorSections}
                />
            }
            {
                <div className='results'>
                    <h1 className='page-title'>
                        {PAGE_TITLE}
                    </h1>
                    {hasErrorArticles && <strong className='error'>Oops! Something went wrong.</strong>}
                    {!hasErrorArticles && isLoadingArticles && <Spinner text='Searching for articles...' />}
                    {
                        !isLoadingArticles && articles && <Results
                            title={PAGE_TITLE}
                            data={articles}
                            authors={authors}
                            onClick={handlePageChange}
                        />
                    }
                </div>
            }
        </div>
    );
}