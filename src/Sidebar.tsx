import { ReactElement } from 'react';
import SearchForm from './SearchForm';
import Categories from './Categories';
 
type Categories = string[];

interface PropsCategories {
    categories: Categories;
}

export default function Sidebar(props: PropsCategories): ReactElement {
    const categories = props.categories;

    return (
        <div className='sidebar'>
            <SearchForm/>
            <Categories categories={categories}/>
        </div>
    )
}