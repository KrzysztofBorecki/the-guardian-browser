import { ReactElement } from 'react';
import type { ResponseSectionsResults } from './Types';
import type { SectionsData } from './Categories.types';

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
    );
}