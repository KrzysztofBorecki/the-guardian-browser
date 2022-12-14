import { ReactElement } from 'react';
import { SectionsResponseResults } from '../../types/types';
// import { useSearchParams } from 'react-router-dom';
import type { DataSections } from './Sections.types';

export default function Sections(props: DataSections): ReactElement {
    const sectionsData = props.sectionsData;
    const searchParams = props.searchParams;
    // const [searchParams, setSearchParams] = useSearchParams();

    const currentSection = searchParams.get('section');

    // function handleClick(section: string) {
    //     setSearchParams({ section });
    // }

    const items = sectionsData.map((section: SectionsResponseResults) =>
        <li 
            key={section.id} 
            className='main-section' 
            data-href={section.webUrl}
            onClick={() => {
                props.onClick(section.id);
                // handleClick(section.id);
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