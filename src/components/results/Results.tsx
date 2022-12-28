import { ReactElement } from 'react';
import Card from '../card/Card';
import Pagination from '../pagination/Pagination';
import styles from './Results.module.scss';
import type { SearchResponseResults, Author } from '../../types/types';
import type { DataResults } from './Results.types';

function getArticlesCards(articles: SearchResponseResults[], authors: Author[]): ReactElement[] {
    return articles.map((obj: SearchResponseResults, idx: number) =>
        <Card
            key={obj.id} {...obj}
            author={authors[idx]}
        />
    );
}

export default function Results(props: DataResults): ReactElement {
    const articles = props.data.results;
    const articlesCards = getArticlesCards(articles, props.authors);

    return (
        <div className={styles.results}>
            <div className={styles.articles}>
                {!!articles.length && articlesCards}
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