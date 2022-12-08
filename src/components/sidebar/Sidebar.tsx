import { ReactElement } from 'react';
import SearchForm from '../searchform/SearchForm';
import Categories from '../sections/Categories';
import type { SidebarProps } from './Sidebar.types';

export default function Sidebar(props: SidebarProps): ReactElement {
    return (
        <div className='sidebar'>
            <SearchForm
                onSubmit={props.onSubmit}
                onReset={props.onReset}
            />
            <Categories
                {...props}
            />
        </div>
    );
}