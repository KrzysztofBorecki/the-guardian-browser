import { ReactElement } from 'react';
// import { TEST_CATEGORIES } from './Data';
import { TEST_Category, TEST_Categories } from './Types';
import { ResponseSectionsResults } from './AxiosSections';

// const categories: TEST_Categories = TEST_CATEGORIES;

type SectionsData = {
    sectionsData: ResponseSectionsResults[]
} 

export default function Categories(props: SectionsData): ReactElement {
    const sectionsData = props.sectionsData;

    const items = sectionsData.map((section: ResponseSectionsResults) =>
        <li key={section.id} className='main-category' data-href={section.webUrl}>
            {section.webTitle}
        </li>
    );
    return (
        <ul className='categories'>
            {items}
        </ul>
    )
}