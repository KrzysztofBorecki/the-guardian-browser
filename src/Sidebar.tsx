import { ReactElement } from 'react';
import SearchForm from './SearchForm';
import Categories from './Categories';
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