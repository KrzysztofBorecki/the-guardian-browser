import { ReactElement } from 'react';
import SearchForm from '../search-form/SearchForm';
import Sections from '../sections/Sections';
import Spinner from '../spinner/Spinner';
import styles from './Sidebar.module.scss';
import type { ISidebarProps } from './Sidebar.types';

export default function Sidebar(props: ISidebarProps): ReactElement {
    return (
        <div className={styles.sidebar}>
            <SearchForm
                onSearchChange={props.onSearchChange}
            />
            {props.hasError && <strong className='error'>Oops! Something went wrong.</strong>}
            {!props.hasError && props.isLoading && <Spinner text='Finding Sections...' />}
            {!props.isLoading && props.sectionsData && <Sections
                sectionsData={props.sectionsData}
                searchParams={props.searchParams}
                onClick={props.onClick}
            />
            }
        </div>
    );
}