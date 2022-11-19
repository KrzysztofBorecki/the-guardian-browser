import { ReactElement } from 'react';
import arrowRight from './arrow-right.svg';
import { Author, CardData } from './Types';

// import { Link } from 'react-router-dom';

export default function Card(props: CardData): ReactElement {
    return (
        <div className='card'>
            <div className='card-info'>
                <p className='card-info-tag'>
                    {props.tag.toUpperCase()}
                </p>          
                <p className='card-info-date'>
                    {props.date}
                </p>
            </div>
            <h2 className='card-title'>
                {props.title}
            </h2>
            <p className='card-text'>
                {props.text}
            </p>
            <div className='card-info'>
                <a className='card-info-author' href='/'>
                    <img className='avatar' src={props.author.avatar} alt="avatar" />
                    <p className='name'>{props.author.name}</p>
                </a>
                <a className='card-info-link' href={`https://www.theguardian.com`}>
                    Read more
                    <img src={arrowRight} className={'arrow-right'} alt="arrow right" />
                </a>
            </div>
        </div>
    );
}