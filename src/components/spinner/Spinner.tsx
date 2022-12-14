import type { DataSpinner } from './Spinner.types';

const list = Array.from(new Array(12).fill(null), (_, idx) => idx + 1);
const divList = list.map((value) => <div key={value}/>);

export default function Spinner(props: DataSpinner) {
    return (
        <>
            <strong className='spinner-text'>
                {props.text}
            </strong>
            <div className="spinner">
                {divList}
            </div>
        </>
    );
}