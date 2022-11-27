import { ReactElement } from 'react';
import SearchForm from './SearchForm';
import Categories from './Categories';
import type { SidebarProps } from './Types';

export default function Sidebar(props: SidebarProps): ReactElement {
    return (
        <div className='sidebar'>
            <SearchForm 
                onSubmit={props.onSubmit} 
                onReset={props.onReset} 
            />
            <Categories sectionsData={props.sectionsData}/>
        </div>
    );
}