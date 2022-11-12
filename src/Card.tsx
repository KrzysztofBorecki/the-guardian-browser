import { ReactElement } from 'react';

interface PropsCard {
    title: string;
    date: string;
    tag: string;
    text: string;
}

export default function Card(props: PropsCard): ReactElement {
    return (
        <div className='card'>
            <h2 className='card-title'>
                {props.title}
            </h2>
            <div className='card-info'>
                <p>
                    {`Date: ${props.date}`}
                </p>
                <p>
                    {`Tags: ${props.tag}`}
                </p>          
            </div>
            <p className='card-text'>
                {props.text}
            </p>
        </div>
    );
}