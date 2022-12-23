import styles from './ButtonToggle.module.scss'
import type { DataButtonToggle } from './ButtonToggle.types';

export default function ButtonToggle(props: DataButtonToggle) {
    return (
        <>
            <button 
                type='button'
                id={props.id}
                className={styles['btn-toggle']}
                data-iscollapsed = {props.isCollapsed} 
                // aria-controls="navbar-navigation" 
                // aria-expanded="false"
            >
                <span></span>
            </button> 
        </>
    );
}