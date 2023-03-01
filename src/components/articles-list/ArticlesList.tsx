import { ReactElement } from 'react';
import ArticlePreview from '../article-preview/ArticlePreview';
import Pagination from '../pagination/Pagination';
import Spinner from '../spinner/Spinner';
import styles from './ArticlesList.module.scss';
import type { ISearchResponseResultsMocked } from '../../types/types';
import type { IArticlesListProps } from './ArticlesList.types';

function getArticlesPreviews(articles: ISearchResponseResultsMocked[]): ReactElement[] {
    return articles.map((obj: ISearchResponseResultsMocked) =>
        <ArticlePreview
            key={obj.id} {...obj}
        />
    );
}

export default function ArticlesList(props: IArticlesListProps): ReactElement {
    const articles = (props.data) ? props.data.results : null;
    const articlesPreviews = (articles) ? getArticlesPreviews(articles) : null;
    const isDataLoadedWithoutError = !props.hasError && !props.isLoading && articles;

    return (
        <div className={styles.results}>
            <div className={styles.articles}>
                {isDataLoadedWithoutError && !!articles.length && 
                    articlesPreviews}
                {isDataLoadedWithoutError && !articles.length && 
                    <strong className={styles['no-results']}>
                        Sorry! No results found!
                    </strong>}
                {!props.hasError && props.isLoading && 
                    <Spinner text='Searching for articles...' />}
                {props.hasError && <strong className='error'>Oops! Something went wrong.</strong>}
            </div>
            {props.data && articles && !!articles.length && <Pagination
                pagesAll={props.data.pages}
                pagesCurrent={props.data.currentPage}
                onClick={props.onClick}
            />
            }
        </div>
    );
}