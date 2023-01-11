import { ReactElement } from 'react';
import ArticlePreview from '../article-preview/ArticlePreview';
import Pagination from '../pagination/Pagination';
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
    const articles = props.data.results;
    const articlesPreviews = getArticlesPreviews(articles);

    return (
        <div className={styles.results}>
            <div className={styles.articles}>
                {!!articles.length && articlesPreviews}
                {!articles.length && <strong className={styles['no-results']}>Sorry! No results found!</strong>}
            </div>
            {!!articles.length && <Pagination
                pagesAll={props.data.pages}
                pagesCurrent={props.data.currentPage}
                onClick={props.onClick}
            />
            }
        </div>
    );
}