import { ReactElement } from 'react';
import { TEST_CATEGORIES } from './Data';

interface Category {
    maincategory: string;
    subcategories: string[];
}

type Categories = Category[];

const categories: Categories = TEST_CATEGORIES;

export default function Categories(): ReactElement {
    const items = categories.map((category: Category) =>
        <li key={category.maincategory} className='main-category'>
            {category.maincategory}
        </li>
    );
    return (
        <ul className='categories'>
            {items}
        </ul>
    )
}