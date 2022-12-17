import { ReactElement, useState } from 'react';
import { SectionsResponseResults } from '../../types/types';
import Button from '../button/Button';
import type { DataSections } from './Sections.types';

export default function Sections(props: DataSections): ReactElement {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const sectionsData = props.sectionsData;
    const searchParams = props.searchParams;
    const currentSection = searchParams.get('section');
    const items = sectionsData.map((section: SectionsResponseResults) =>
        <li 
            key={section.id} 
            className='sections-item' 
            data-href={section.webUrl}
            onClick={() => {
                props.onClick(section.id);
            }}
            data-selected={(section.id === currentSection) ? true : false}
        >
            {section.webTitle}
        </li>
    );
    
    function handleClick() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className='sections-container'>
            <div className={'hidden sections-item sections-toggle'} data-iscollapsed={isCollapsed} onClick={handleClick}>
                <p>Sections</p>
                <Button isCollapsed={isCollapsed}/>
            </div>
            <ul className='sections' data-iscollapsed={isCollapsed}>
                {items}
            </ul>
        </div>
    );
}