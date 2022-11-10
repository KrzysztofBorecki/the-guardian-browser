import { ReactElement } from 'react'

interface PropsCard {
    title: string;
    date: string;
    tag: string;
    text: string;
}

export default function Card(props: PropsCard): ReactElement {
    return (
        <div>
            <h2>
                {props.title}
            </h2>
            <div>
                <p>
                    {props.date}
                </p>
                <p>
                    {props.tag}
                </p>          
            </div>
            <p>
                {props.text}
            </p>
        </div>
    );
}