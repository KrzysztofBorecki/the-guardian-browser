import { ReactElement } from 'react';
import Card from './Card';
import Pagination from './Pagination';
import type { ResponseSearchResults } from './Types';
import type { ResultsData } from './Results.types';

export default function Results(props: ResultsData): ReactElement {
    const articles = props.data.results;
    const items = articles.map((obj: ResponseSearchResults, idx: number) =>
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