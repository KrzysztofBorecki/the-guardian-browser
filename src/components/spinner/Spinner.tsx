import type { DataSpinner } from './Spinner.types';

export default function Spinner(props: DataSpinner) {
    const element = Array.from(new Array(12).fill(null), (_, idx) => idx + 1);
    const elements = element.map((value) => <div key={value}/>);

    return (
        <>
            <strong className='spinner-text'>
                {props.text}
            </strong>
            <div className="spinner">
                {elements}
            </div>
        </>
    );
}