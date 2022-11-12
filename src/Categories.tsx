import { ReactElement } from 'react';

type Categories = string[];

interface PropsCategories {
    categories: Categories;
}

export default function Categories(props: PropsCategories): ReactElement {
    const categories = props.categories;
    const items = categories.map((name: string) =>
        <li key={name} className='category'>
            {name}
        </li>
    );
    return (
        <ul className='categories'>
            {items}
        </ul>
    )
}