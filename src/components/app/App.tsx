import React, { ReactElement, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE_TITLE, PAGE_NUMBER_DEFAULT, getAuthors } from '../../utils/data';
import Sidebar from '../sidebar/Sidebar';
import Results from '../results/Results';
import Spinner from '../spinner/Spinner';
import { httpGet } from '../../utils/httpGet';
import type { SectionsResponseResults, SearchResponse, Author } from '../../types/types';

export default function App(): ReactElement {
    const [sections, setSections] = useState<SectionsResponseResults[] | null>(null);
    const [articles, setArticles] = useState<SearchResponse | null>(null);
    const [authors, setAuthors] = useState<Author[]>(getAuthors());
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState<true | false>(false);  
    const [hasArticlesError, setHasArticlesError] = useState<true | false>(false);

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

    function getCurrentPageNumber() {
        return Number(searchParams.get('page'));
    }

    function handlePageDown() {
        if (!searchParams.has('page')) return;

        const currentPage = getCurrentPageNumber();

        if (currentPage === 1) return;

        const page = String(currentPage - 1);

        setSearchParams({ ...searchParams, page });
    }

    function handlePageUp() {
        const currentPage = getCurrentPageNumber();

        if (!currentPage || !articles || (currentPage === articles.pages)) return;

        const page = String(currentPage + 1);

        setSearchParams({ ...searchParams, page });
    }

    function handlePageChange(e: React.PointerEvent<HTMLLIElement>) {
        if (!articles) return;

        const newPage = Number(e.currentTarget.textContent);

        if (!newPage || (newPage === articles.currentPage)) return;

        const page = String(newPage);

        setSearchParams({ ...searchParams, page })

        e.preventDefault();
    }

    useEffect(() => {
        httpGet('sections').then(
            (value) => {
                if (!value || (typeof value === 'string') || ('pages' in value)) return;

                setSections(value.results);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);  

    useEffect(() => {
        setIsLoading(true);
        setHasArticlesError(false);

        httpGet('search', Object.fromEntries(searchParams)).then(
            (value) => {
                if (!value || (typeof value === 'string') || !('pages' in value)) return;

                setAuthors(getAuthors());
                setArticles(value)
                setIsLoading(false);
            },
            (err) => {
                console.log(`error: ${err}`)
                setIsLoading(false);
                setHasArticlesError(true);
            }
        );
    }, [searchParams]);

    return (
        <div className='app'>
            {
                (sections) ?
                <Sidebar
                    sectionsData={sections}
                    searchParams={searchParams}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    onClick={handleClick}
                /> :
                null
            }
            {
                <div  className='results'>
                    <h1 className='page-title'>
                        {PAGE_TITLE}
                    </h1>
                    {hasArticlesError && <strong className='error'>Oops! Something went wrong.</strong>}
                    {!hasArticlesError && isLoading && <Spinner text='Searching for articles...'/>}
                    {
                        !isLoading && articles && <Results
                            title={PAGE_TITLE}
                            data={articles}
                            authors={authors}
                            onClick={handlePageChange}
                            onPageUp={handlePageUp}
                            onPageDown={handlePageDown}
                        /> 
                    }
                </div>     
            }
        </div>
    );
}