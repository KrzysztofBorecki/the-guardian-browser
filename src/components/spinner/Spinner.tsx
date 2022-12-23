import type { DataSpinner } from './Spinner.types';
import styles from './Spinner.module.scss';

const list = Array.from(new Array(12).fill(null), (_, idx) => idx + 1);
const divList = list.map((value) => <div key={value}/>);

export default function Spinner(props: DataSpinner) {
    return (
        <>
            <strong className={styles['spinner-text']}>
                {props.text}
            </strong>
            <div className={styles.spinner}>
                {divList}
            </div>
        </>
    );
}