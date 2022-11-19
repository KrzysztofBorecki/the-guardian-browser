import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PagesData } from './Types';

function getLastDigit(number: number) {
    return number % 10;
}

function getPaginationListSpliced(paginationList: number[], pagesCurrent: number) {
    const pagesCurrentLastDigit = getLastDigit(pagesCurrent);
    const pagesAfterCurrent = 10 - pagesCurrentLastDigit;
    const pagesBeforeCurrent = pagesCurrentLastDigit - 1;
    const paginationListSpliced = paginationList.slice(pagesCurrent - pagesBeforeCurrent - 1, pagesCurrent + pagesAfterCurrent);
    
    return paginationListSpliced;
}

function getPaginationList(pagesAll: number, pagesCurrent: number) {
    const paginationList = Array.from(new Array(pagesAll), (_, index) => index + 1);

    if (pagesAll <= 10) {
        return paginationList;
    }

    return getPaginationListSpliced(paginationList, pagesCurrent);
}

export default function Pagination(props: PagesData) {
    const [pagesAll, setPageAll] = useState(props.pagesAll);
    const [pagesCurrent, setPageCurrent] = useState(props.pagesCurrent);

    const paginationList = getPaginationList(pagesAll, pagesCurrent);

    const paginationItemsListFull = paginationList.map((value) => {
        return (
            <li
                key={value}
                className='pagination-list-item'
                data-selected={(value === pagesCurrent) ? true : false}
            >
                <Link to={'/'} className='pagination-link' data-title={value}>
                    {value}
                </Link>
            </li>
        );
    });

    return (
        <div className='pagination'>
            <Link to={'/'} className='pagination-btn' data-title='Previous'>
                Previous
            </Link>
            <ul className='pagination-list'>
                {paginationItemsListFull}
            </ul>
            <Link to={'/'} className='pagination-btn' data-title='Next'>
                Next
            </Link>
        </div>
    );
}