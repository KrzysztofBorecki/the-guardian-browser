import React, { ReactElement } from 'react';
import { arrowRight } from '../../utils/icons';
import { getParsedDate } from '../../utils/dates';
import styles from './ArticlePreview.module.scss';
import type { TArticlePreviewProps } from './ArticlePreview.types';

export default function ArticlePreview(props: TArticlePreviewProps): ReactElement {
    return (
        <a
            href={props.webUrl}
            className={styles.card}
            target='_blank'
            rel='noreferrer noopener'
        >
            <div className={styles['card-info']}>
                <p className={styles['card-info-tag']}>
                    {props.sectionName.toUpperCase()}
                </p>
                <p className={styles['card-info-date']}>
                    {getParsedDate(props.webPublicationDate)}
                </p>
            </div>
            <h2 className={styles['card-title']}>
                {props.webTitle}
            </h2>
            <p className={styles['card-text']}>
                {props.text}
            </p>
            <div className={styles['card-info']}>
                <div
                    className={styles['card-info-author']}
                    onClick={(event: React.PointerEvent<HTMLDivElement>) => {
                        event.preventDefault();
                    }}
                >
                    <img className={styles.avatar} src={props.author.avatar} alt='avatar' />
                    <p className={styles.name}>{props.author.name}</p>
                </div>
                <p
                    className={styles['card-info-link']}
                    onClick={() => window.open(props.webUrl, '_blank', 'noopener,noreferrer')}
                >
                    Read more
                    <img src={arrowRight} className={styles['arrow-right']} alt='arrow right' />
                </p>
            </div>
        </a>
    );
}