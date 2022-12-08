import React, { ReactElement } from 'react';
import { arrowRight, getRandomLorem } from '../../utils/data';
import type { CardData } from './Card.types';

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

function handleClick(url: string) {
    window.open(url);
}

export default function Card(props: CardData): ReactElement {
    return (
        <a
            href={props.webUrl}
            className='card'
            target='_blank'
            rel="noreferrer noopener"
        // onClick={() => document.location.href = props.webUrl}
        >
            <div className='card-info'>
                <p className='card-info-tag'>
                    {props.sectionName.toUpperCase()}
                </p>
                <p className='card-info-date'>
                    {getParsedDate(props.webPublicationDate)}
                </p>
            </div>
            <h2
                className='card-title'
            // onClick={() => handleClick(props.webUrl)}
            >
                {props.webTitle}
            </h2>
            <p
                className='card-text'
            // onClick={() => handleClick(props.webUrl)}
            >
                {getRandomLorem(25, 50)}
            </p>
            <div className='card-info'>
                <div
                    className='card-info-author'
                    onClick={(event: React.PointerEvent<HTMLDivElement>) => {
                        console.log(`link to: About me - ${props.author.name}`);
                        event.preventDefault();
                    }}
                >
                    <img className='avatar' src={props.author.avatar} alt="avatar" />
                    <p className='name'>{props.author.name}</p>
                </div>
                <p
                    className='card-info-link'
                    // href={props.webUrl}
                    onClick={() => handleClick(props.webUrl)}
                >
                    Read more
                    <img src={arrowRight} className={'arrow-right'} alt="arrow right" />
                </p>
            </div>
        </a>
    );
}