import { ReactElement } from 'react';
import type { DataSpinner } from './Spinner.types';
import { spinner } from '../../utils/data';
import styles from './Spinner.module.scss';

export default function Spinner(props: DataSpinner): ReactElement {
    return (
        <div className={styles.spinner}>
            <strong className={styles['spinner-text']}>
                {props.text}
            </strong>
            <img className={styles['spinner-svg']} src={spinner} alt='spinner' />
        </div>
    );
}