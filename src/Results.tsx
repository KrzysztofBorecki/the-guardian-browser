import { ReactElement } from 'react';
import Card from './Card';
import Pagination from './Pagination';
import type { ResultsData } from './Types';
import type { ResponseArticlesResults } from './AxiosArticles';

export default function Results(props: ResultsData): ReactElement {
    const articles = props.data.results;
    const items = articles.map((obj: ResponseArticlesResults, idx: number) =>
        <Card
            key={obj.id} {...obj}
            author={props.authors[idx]}
        />
    );

    return (
        <div className='results'>
            <h1 className='page-title'>
                {props.title}
            </h1>
            <div className='articles'>
                {items}
            </div>
            <Pagination
                pagesAll={props.data.pages}
                pagesCurrent={props.data.currentPage}
                onClick={props.onClick}
                onPageUp={props.onPageUp}
                onPageDown={props.onPageDown}
            />
        </div>
    );
}