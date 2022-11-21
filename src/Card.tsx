import { ReactElement } from 'react';
import arrowRight from './arrow-right.svg';
import type { CardData } from './Types';

// function getParsedDate(dateString: string): string {
//     const dateMs = Date.parse(dateString);
//     const dateObj = new Date(dateMs);
//     const year = dateObj.getFullYear();
//     const month = dateObj.getMonth() + 1;
//     const day = dateObj.getDate();
    
//     return `${day}-${month}-${year}`;
// }

function getDateString(value: string): string {
    return new Date(value).toString();
};

function getDateParamList(value: string): string[] {
    return value.split(' ');
}

function getArticleDate(value: string[]): string {
    return `${value[2]} ${value[1]} ${value[3]}`;
}

function getParsedDate(value: string): string {
    const dateString = getDateString(value);
    const dateSplitted = getDateParamList(dateString);

    return getArticleDate(dateSplitted);
}

// import { Link } from 'react-router-dom';

export default function Card(props: CardData): ReactElement {
    return (
        <a className='card' href={props.webUrl}>
            <div className='card-info'>
                <p className='card-info-tag'>
                    {props.sectionName.toUpperCase()}
                </p>          
                <p className='card-info-date'>
                    {getParsedDate(props.webPublicationDate)}
                </p>
            </div>
            <h2 className='card-title'>
                {props.webTitle}
            </h2>
            <p className='card-text'>
                {'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea suscipit fuga quisquam eos, quaerat non at eum eius quia ut deserunt sed, aliquid qui explicabo totam nulla velit modi vitae.'}
            </p>
            <div className='card-info'>
                <a className='card-info-author' href='/'>
                    <img className='avatar' src={props.author.avatar} alt="avatar" />
                    <p className='name'>{props.author.name}</p>
                </a>
                <a className='card-info-link' href={props.webUrl}>
                    Read more
                    <img src={arrowRight} className={'arrow-right'} alt="arrow right" />
                </a>
            </div>
        </a>
    );
}