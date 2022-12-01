import React, { ReactElement, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE_TITLE, PAGE_NUMBER_DEFAULT, getAuthors } from './Data';
import Sidebar from './Sidebar';
import Results from './Results';
import { httpGet } from './httpGet';

import type { ResponseSectionsResults, ResponseSearch } from './httpGet.types';
import type { Author } from './Types';

export default function App(): ReactElement {
    const [sections, setSections] = useState<ResponseSectionsResults[] | null>(null);
    const [articles, setArticles] = useState<ResponseSearch | null>(null);
    const [authors, setAuthors] = useState<Author[]>(getAuthors());
    const [searchParams, setSearchParams] = useSearchParams();

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

        if (!currentPage) return;
        if (!articles) return;
        if (currentPage === articles.pages) return;

        const page = String(currentPage + 1);

        setSearchParams({ ...searchParams, page });
    }

    function handlePageChange(e: React.PointerEvent<HTMLLIElement>) {
        if (!articles) return;

        const newPage = Number(e.currentTarget.textContent);

        if (!newPage || newPage === articles.currentPage) return;

        const page = String(newPage);

        setSearchParams({ ...searchParams, page })

        e.preventDefault();
    }

    //_set front page url with 'page=1'? 
/*     useEffect(() => {
    setSearchParams({ page: PAGE_NUMBER_DEFAULT });
    }, []);  */

    useEffect(() => {
        httpGet('sections').then(
            (value) => {
                if (!value) return;
                if (typeof value === 'string') return;
                if ('pages' in value) return;

                setSections(value.results);
            }
        );

        httpGet('search', Object.fromEntries(searchParams)).then(
            (value) => {
                if (!value) return;
                if (typeof value === 'string') return;
                if (!('pages' in value)) return;

                setAuthors(getAuthors());
                setArticles(value);
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
                (articles) ?
                <Results
                    title={PAGE_TITLE}
                    data={articles}
                    authors={authors}
                    onClick={handlePageChange}
                    onPageUp={handlePageUp}
                    onPageDown={handlePageDown}
                /> :
                null
            }
        </div>
    );
}