import { ReactElement } from 'react';
import styles from './HamburgerIcon.module.scss'
import type { HamburgerIconData } from './HamburgerIcon.types';

export default function HamburgerIcon(props: HamburgerIconData): ReactElement {
    return (
        <>
            <button 
                type='button'
                className={styles['btn-toggle']}
                data-iscollapsed = {props.isCollapsed} 
            >
                <span></span>
            </button> 
        </>
    );
}