import { Link } from 'react-router-dom';
import type { PagesData } from './Pagination.types';

function getPaginationBaseValue(pagesAll: number, pagesCurrent: number): number {
    return (Math.floor(pagesCurrent / 10) <= Math.floor(pagesAll / 10)) ?
        (Math.floor((pagesCurrent - 1) / 10)) :
        (Math.floor((pagesAll - 1) / 10));
}

function getPaginationListLength(pagesAll: number, baseValue: number): number {
    return ((baseValue * 10 + 10) <= pagesAll) ? 10 : pagesAll % 10;
}

function getPaginationList(pagesAll: number, pagesCurrent: number): number[] {
    const baseValue = getPaginationBaseValue(pagesAll, pagesCurrent);
    const paginationListLength = getPaginationListLength(pagesAll, baseValue);

    return Array.from(
        new Array(paginationListLength), 
        (_, idx) => baseValue * 10 + idx + 1
    );
}

export default function Pagination(props: PagesData) {
    const paginationList = getPaginationList(props.pagesAll, props.pagesCurrent);
    const paginationItemsListFull = paginationList.map((value) => {
        return (
            <li
                key={value}
                className='pagination-list-item'
                data-selected={(value === props.pagesCurrent) ? true : false}
                onClick={props.onClick}
            >
                <Link
                    to={'/'}
                    className='pagination-link'
                    data-title={value}
                >
                    {value}
                </Link>
            </li>
        );
    });

    return (
        <ul className='pagination'>
            <li
                className='pagination-btn'
                data-title='Previous'
                onClick={props.onPageDown}
            >
                Previous
            </li>
            <ul className='pagination-list'>
                {paginationItemsListFull}
            </ul>
            <li
                className='pagination-btn'
                data-title='Next'
                onClick={props.onPageUp}
            >
                Next
            </li>
        </ul>
    );
}