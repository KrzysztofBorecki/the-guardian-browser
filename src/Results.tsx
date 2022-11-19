import { ReactElement } from 'react';
import Card from './Card';
import Pagination from './Pagination';

import { TEST_PAGES_ALL, TEST_PAGES_CURRENT } from './Data';
import type { ArticleDataBase, ResultsData} from './Types';


export default function Results(props: ResultsData): ReactElement {
    const data = props.data;
    const authors = props.authors;

    const items = data.map((obj: ArticleDataBase, idx: number) =>
        <Card key={obj.title} {...obj} author={authors[idx]} />
    );

    return (
        <div className='results'>
            <h1 className='page-title'>
                {props.title}
            </h1>    
            {/* <div className='page-title page-title-decor'>
                {props.title}
            </div> */}
            <div className='articles'>
                {items}
            </div>
            <Pagination pagesAll={TEST_PAGES_ALL} pagesCurrent={TEST_PAGES_CURRENT}/>
        </div>
    );
}