import { ReactElement, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE_TITLE, getAuthors, PAGE_NUMBER_DEFAULT } from '../../utils/data';
import { httpGet } from '../../utils/httpGet';
import Sidebar from '../sidebar/Sidebar';
import Results from '../results/Results';
import Spinner from '../spinner/Spinner';
import styles from './App.module.scss';
import type { SectionsResponseResults, SearchResponse, Author } from '../../types/types';
// import type { TSetSearchParams } from './App.types';

export default function App(): ReactElement {
    const [sections, setSections] = useState<SectionsResponseResults[] | null>(null);
    const [articles, setArticles] = useState<SearchResponse | null>(null);
    const [authors, setAuthors] = useState<Author[]>(getAuthors());
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(false);
    const [isLoadingSections, setIsLoadingSections] = useState<boolean>(false);
    const [hasErrorArticles, setHasErrorArticles] = useState<boolean>(false);
    const [hasErrorSections, setHasErrorSections] = useState<boolean>(false);

    function handleSubmit(searchPhrase: string): void {
        if (searchPhrase === '') {
            searchParams.delete('q');     
            searchParams.set('page', PAGE_NUMBER_DEFAULT);
            setSearchParams(searchParams);
        } else {
            searchParams.set('q', searchPhrase);
            searchParams.set('page', PAGE_NUMBER_DEFAULT);
            setSearchParams(searchParams);
        }
    }

    function handleResetArticles(): void {
        searchParams.delete('q')  
        searchParams.delete('section')
        searchParams.set('page', PAGE_NUMBER_DEFAULT)  
        setSearchParams(searchParams);
    }

    function handleResetSections(): void {
        searchParams.delete('section')  
        setSearchParams(searchParams);
    }

    function handleSectionClick(section: string): void {
        searchParams.set('section', section)
        setSearchParams(searchParams);
    }

    function handlePageChange(value: number): void {
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
        <div className={styles.app}>
            <h1 className={styles['page-title']}>
                {PAGE_TITLE}
            </h1>
            <Sidebar
                sectionsData={sections}
                searchParams={searchParams}
                onSubmit={handleSubmit}
                onResetArticles={handleResetArticles}
                onResetSections={handleResetSections}
                onClick={handleSectionClick}
                isLoading={isLoadingSections}
                hasError={hasErrorSections}
            />
            {
                <div className={styles.results}>
                    {hasErrorArticles && <strong className={styles.error}>Oops! Something went wrong.</strong>}
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