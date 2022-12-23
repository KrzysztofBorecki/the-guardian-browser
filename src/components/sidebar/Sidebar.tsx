import { ReactElement } from 'react';
import SearchForm from '../searchform/SearchForm';
import Sections from '../sections/Sections';
import Spinner from '../spinner/Spinner';
import styles from './Sidebar.module.scss';
import type { SidebarProps } from './Sidebar.types';

export default function Sidebar(props: SidebarProps): ReactElement {
    return (
        <div className={styles.sidebar}>
            <SearchForm
                onSubmit={props.onSubmit}
                onResetArticles={props.onResetArticles}
                onResetSections={props.onResetSections}
            />
            {props.hasError && <strong className='error'>Oops! Something went wrong.</strong>}
            {!props.hasError && props.isLoading && <Spinner text='Finding Sections...'/>}
            {!props.isLoading && props.sectionsData && <Sections
                    sectionsData={props.sectionsData}
                    searchParams={props.searchParams}
                    onClick={props.onClick}
                />
            }
        </div>
    );
}