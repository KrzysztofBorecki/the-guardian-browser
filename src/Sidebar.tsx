import { ReactElement } from 'react';
import SearchForm from './SearchForm';
import Categories from './Categories';
import { SidebarProps } from './Types';

export default function Sidebar(props: SidebarProps): ReactElement {
    return (
        <div className='sidebar'>
            <SearchForm 
                onChange={props.onChange} 
                onSubmit={props.onSubmit} 
                onReset={props.onReset} 
                searchQuery={props.searchQuery}
            />
            <Categories sectionsData={props.sectionsData}/>
        </div>
    )
}