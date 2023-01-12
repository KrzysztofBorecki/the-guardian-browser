import { ReactElement } from 'react';
import styles from './HamburgerIcon.module.scss'
import type { IHamburgerIconProps } from './HamburgerIcon.types';

export default function HamburgerIcon(props: IHamburgerIconProps): ReactElement {
    return (
        <div className={styles['btn-toggle-container']}>
            <div
                className={styles['btn-toggle']}
                data-iscollapsed={props.isCollapsed}
            >
                <div></div>
            </div>
        </div>
    );
}