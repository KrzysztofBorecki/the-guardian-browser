import { ReactElement } from 'react';
import Card from './Card';
import Pagination from './Pagination';

import {TEST_PAGES_ALL, TEST_PAGES_CURRENT} from './Data';

interface DataObj {
    title: string;
    date: string;
    tag: string;
    text: string;
}

type Data = DataObj[];

interface PropsResults {
    title: string;
    data: Data;
}

export default function Results(props: PropsResults): ReactElement {
    const data = props.data;
    const items = data.map((obj: DataObj) =>
        <Card key={obj.title} {...obj} />
    );
    return (
        <div className='results'>
            <h1 className='page-title'>
                {props.title}
            </h1>
            <div className='articles'>
                {items}
            </div>
            <Pagination pagesAll={TEST_PAGES_ALL} pagesCurrent={TEST_PAGES_CURRENT}/>
        </div>
    );
}