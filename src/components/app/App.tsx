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
    const [state, setState] = useState<any[]>([]);

    useEffect(() => {
        setState([...state, searchParams]);
    }, [searchParams])

    useEffect(() => {
        state.forEach((value, idx, array) => {
            if (array.length - 1 === idx) return;
            console.log(value === array[idx + 1]);
            console.log(state);
        })
    }, [state]);


    function handleSubmit(searchPhrase: string): void {
        if (!searchPhrase) return;
        searchParams.set('q', searchPhrase);
        searchParams.set('page', PAGE_NUMBER_DEFAULT);
        setSearchParams(searchParams);
    }

    function handleReset() {
        //__to show /?page=1
        setSearchParams({ page: PAGE_NUMBER_DEFAULT });
        //__to omit /?page=1
        // setSearchParams({});
    }

    function handleClick(section: string) {
        searchParams.set('section', section)
        setSearchParams(searchParams);
    }

    function handlePageChange(value: number) {
        const page = value.toString();
        searchParams.set('page', page);
        setSearchParams(searchParams);
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