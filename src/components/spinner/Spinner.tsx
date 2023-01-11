import { ReactElement } from 'react';
import type { ISpinnerProps } from './Spinner.types';
import { spinner } from '../../utils/icons';
import styles from './Spinner.module.scss';

export default function Spinner(props: ISpinnerProps): ReactElement {
    return (
        <div className={styles.spinner}>
            <strong className={styles['spinner-text']}>
                {props.text}
            </strong>
            <img className={styles['spinner-svg']} src={spinner} alt='spinner' />
        </div>
    );
}