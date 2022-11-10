import { ReactElement } from 'react';
import Card from './Card';

interface Data {
    title: string;
    date: string;
    tag: string;
    text: string;
}

interface PropsResults {
    title: string;
    data: Data;
}

export default function Results(props: PropsResults): ReactElement {
    return (
        <div>
            <h1>
                {props.title}
            </h1>
            <Card 
                title={props.data.title} 
                date={props.data.date}
                tag={props.data.tag}
                text={props.data.text}
            />
        </div>
    );
}