import { ReactElement } from 'react';
import SearchForm from './SearchForm';
import Categories from './Categories';

export default function Sidebar(): ReactElement {
    return (
        <div className='sidebar'>
            <SearchForm/>
            <Categories/>
        </div>
    )
}