import { ReactElement, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE_TITLE, PAGE_NUMBER_DEFAULT, getAuthors } from '../../utils/data';
import { httpGet } from '../../utils/httpGet';
import Sidebar from '../sidebar/Sidebar';
import Results from '../results/Results';
import Spinner from '../spinner/Spinner';
import styles from './App.module.scss';
import type { SectionsResponseResults, SectionsResponse, SearchResponse, Author } from '../../types/types';

function updateSearchParams(searchParams: URLSearchParams, params: Record<string, string | null>): void {
    Object.entries(params).forEach((value) => {
        if (value[1] === '') {
            searchParams.delete(`${value[0]}`)
        } else {
            searchParams.set(`${value[0]}`,`${value[1]}`);
        }
    });
}

export default function App(): ReactElement {
    const [sections, setSections] = useState<SectionsResponseResults[] | null>(null);
    const [articles, setArticles] = useState<SearchResponse | null>(null);
    const [authors, setAuthors] = useState<Author[]>(getAuthors());
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(false);
    const [isLoadingSections, setIsLoadingSections] = useState<boolean>(false);
    const [articlesRequestError, setArticlesRequestError] = useState<boolean>(false);
    const [sectionsRequestError, setSectionsRequestError] = useState<boolean>(false);

    function submitSearchPhrase(searchPhrase: string): void {
        updateSearchParams(searchParams, {'q': searchPhrase, 'page': PAGE_NUMBER_DEFAULT});
        setSearchParams(searchParams);
    }

    function resetAll(): void {
        updateSearchParams(searchParams, {'q': '', 'section': '', 'page': PAGE_NUMBER_DEFAULT});
        setSearchParams(searchParams);
    }

    function resetSection(): void {
        updateSearchParams(searchParams, {'section': ''});
        setSearchParams(searchParams);
    }

    function selectSection(section: string): void {
        updateSearchParams(searchParams, {'section': section});
        setSearchParams(searchParams);
    }

    function selectPage(value: number): void {
        const page = value.toString();

        updateSearchParams(searchParams, {'page': page});
        setSearchParams(searchParams);
        window.scrollTo(0,0);
    }

    useEffect(() => {
        setIsLoadingSections(true);
        setSectionsRequestError(false);
        httpGet<SectionsResponse>('sections').then((value) => {
            setSections(value.results);
            setIsLoadingSections(false);
        }).catch(() => {
            setIsLoadingSections(false);
            setSectionsRequestError(true);
        });
    }, []);

    useEffect(() => {
        setIsLoadingArticles(true);
        setArticlesRequestError(false);
        httpGet<SearchResponse>('search', Object.fromEntries(searchParams)).then((value) => {
            setAuthors(getAuthors());
            setArticles(value)
            setIsLoadingArticles(false);
        }).catch(() => {
            setIsLoadingArticles(false);
            setArticlesRequestError(true);
        });
    }, [searchParams]);

    return (
        <div className={styles.app}>
            <h1 className={styles['page-title']}>
                {PAGE_TITLE}
            </h1>
            <Sidebar
                sectionsData={sections}
                searchParams={searchParams}
                onSubmit={submitSearchPhrase}
                onResetAll={resetAll}
                onResetSection={resetSection}
                onClick={selectSection}
                isLoading={isLoadingSections}
                hasError={sectionsRequestError}
            />
            <>
                {articlesRequestError && <strong className='error'>Oops! Something went wrong.</strong>}
                {!articlesRequestError && isLoadingArticles && <Spinner text='Searching for articles...' />}
                {
                    !isLoadingArticles && articles && <Results
                        title={PAGE_TITLE}
                        data={articles}
                        authors={authors}
                        onClick={selectPage}
                    />
                }
            </>
        </div>
    );
}