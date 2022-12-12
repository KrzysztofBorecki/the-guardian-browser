import { ReactElement } from 'react';
import { SectionsResponseResults } from '../../types/types';
import type { DataSections } from './Sections.types';

export default function Sections(props: DataSections): ReactElement {
    const sectionsData = props.sectionsData;
    const searchParams = props.searchParams;
    const currentSection = searchParams.get('section');
    const items = sectionsData.map((section: SectionsResponseResults) =>
        <li 
            key={section.id} 
            className='main-section' 
            data-href={section.webUrl}
            onClick={() => {
                props.onClick(section.id);
            }}
            data-selected={(section.id === currentSection) ? true : false}
        >
            {section.webTitle}
        </li>
    );
    
    return (
        <ul className='sections'>
            {items}
        </ul>
    );
}