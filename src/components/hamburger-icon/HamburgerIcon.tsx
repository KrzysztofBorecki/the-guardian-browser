import { ReactElement } from 'react';
import styles from './HamburgerIcon.module.scss'
import type { IHamburgerIconProps } from './HamburgerIcon.types';

export default function HamburgerIcon(props: IHamburgerIconProps): ReactElement {
    return (
        <>
            <button
                type='button'
                className={styles['btn-toggle']}
                data-iscollapsed={props.isCollapsed}
            >
                <span></span>
            </button>
        </>
    );
}