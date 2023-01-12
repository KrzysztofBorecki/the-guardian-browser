import { ReactElement, useState } from 'react';
import { ISectionsResponseResults } from '../../types/types';
import HamburgerIcon from '../hamburger-icon/HamburgerIcon';
import styles from './Sections.module.scss';
import type { ISectionsProps } from './Sections.types';

export default function Sections(props: ISectionsProps): ReactElement {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const sectionsData = props.sectionsData;
    const searchParams = props.searchParams;
    const currentSection = searchParams.get('section');

    const items = sectionsData.map((section: ISectionsResponseResults) =>
        <li
            key={section.id}
            className={styles['sections-item']}
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
        <div className={styles['sections-container']}>
            <button
                type='button'
                className={`'hidden' ${styles['sections-item']} ${styles['sections-btn']}`}
                data-iscollapsed={isCollapsed}
                onClick={() => setIsCollapsed(!isCollapsed)}>
                Sections
                <HamburgerIcon isCollapsed={isCollapsed} />
            </button>
            <ul className={styles.sections} data-iscollapsed={isCollapsed}>
                {items}
            </ul>
        </div>
    );
}