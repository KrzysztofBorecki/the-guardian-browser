import { ReactElement, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE_TITLE, PAGE_NUMBER_DEFAULT } from '../../utils/constants';
import { getArticlesMock } from '../../utils/articles.mock';
import { httpGet } from '../../utils/httpGet';
import Sidebar from '../sidebar/Sidebar';
import ArticlesList from '../articles-list/ArticlesList';
import styles from './App.module.scss';
import type { ISectionsResponseResults, ISectionsResponse, ISearchResponse, ISearchParams, ISearchResponseMocked } from '../../types/types';
import type { TSetSearchParams } from './App.types';

function changeSearchParams(searchParams: URLSearchParams, params: ISearchParams): void {
    Object.entries(params).forEach((value) => {
        if (value[1] === '') {
            searchParams.delete(`${value[0]}`);
        } else {
            searchParams.set(`${value[0]}`, `${value[1]}`);
        }
    });
}

function updateSearchParams(searchParams: URLSearchParams, setSearchParams: TSetSearchParams, params: ISearchParams): void {
    changeSearchParams(searchParams, params);
    setSearchParams(searchParams);
}

export default function App(): ReactElement {
    const [sections, setSections] = useState<ISectionsResponseResults[] | null>(null);
    const [articles, setArticles] = useState<ISearchResponseMocked | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(false);
    const [isLoadingSections, setIsLoadingSections] = useState<boolean>(false);
    const [articlesRequestError, setArticlesRequestError] = useState<boolean>(false);
    const [sectionsRequestError, setSectionsRequestError] = useState<boolean>(false);

    function searchChange(data: ISearchParams): void {
        updateSearchParams(searchParams, setSearchParams, data);
    }

    function selectSection(section: string): void {
        updateSearchParams(searchParams, setSearchParams, { 'section': section, 'page': PAGE_NUMBER_DEFAULT });
    }

    function selectPage(page: number): void {
        updateSearchParams(searchParams, setSearchParams, { 'page': page.toString() });
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        setIsLoadingSections(true);
        setSectionsRequestError(false);

        httpGet<ISectionsResponse>('sections').then((value) => {
            setSections(value.response.results);
        }).catch(() => {
            setSectionsRequestError(true);
        }).finally(() => {
            setIsLoadingSections(false);
        });
    }, []);

    useEffect(() => {
        setIsLoadingArticles(true);
        setArticlesRequestError(false);

        httpGet<ISearchResponse>('search', Object.fromEntries(searchParams)).then((value) => {
            setArticles(getArticlesMock(value.response));
        }).catch(() => {
            setArticlesRequestError(true);
        }).finally(() => {
            setIsLoadingArticles(false);
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
                onSearchChange={searchChange}
                onClick={selectSection}
                isLoading={isLoadingSections}
                hasError={sectionsRequestError}
            />
            <ArticlesList
                title={PAGE_TITLE}
                data={articles}
                onClick={selectPage}
                isLoading={isLoadingArticles}
                hasError={articlesRequestError}
            />
        </div>
    );
}