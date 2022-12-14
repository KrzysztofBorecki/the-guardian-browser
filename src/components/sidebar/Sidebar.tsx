import { ReactElement } from 'react';
import SearchForm from '../searchform/SearchForm';
import Sections from '../sections/Sections';
import Spinner from '../spinner/Spinner';
import type { SidebarProps } from './Sidebar.types';

export default function Sidebar(props: SidebarProps): ReactElement {
    return (
        <div className='sidebar'>
            <SearchForm
                onSubmit={props.onSubmit}
                onReset={props.onReset}
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