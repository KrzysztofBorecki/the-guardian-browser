import React, { ReactElement, useState } from 'react';
import { SEARCH_PHRASE_DEFAULT } from '../../utils/data';
import styles from './SearchForm.module.scss';
import type { SearchFormProps } from './SearchForm.types';

export default function SearchForm(props: SearchFormProps): ReactElement {
    const [searchPhrase, setSearchPhrase] = useState<string>(SEARCH_PHRASE_DEFAULT);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchPhrase(event.target.value);
        event.preventDefault();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        props.onSubmit(searchPhrase);
        event.preventDefault();
    }

    function handleResetArticles(event: React.FormEvent<HTMLFormElement>) {
        setSearchPhrase(SEARCH_PHRASE_DEFAULT);
        props.onResetArticles();
        // event.preventDefault();
    }

    function handleResetSections(event: React.FormEvent<HTMLInputElement>) {
        // setSearchPhrase(SEARCH_PHRASE_DEFAULT);
        props.onResetSections();
        event.preventDefault();
    }

    return (
        <form 
        onSubmit={handleSubmit} 
        onReset={handleResetArticles} 
        className={styles.form}>
            <div className={styles['form-panel']}>
                <label htmlFor='search' className='visually-hidden'>Search</label>
                <input
                    id='search'
                    type='search'
                    // name='search'
                    value={searchPhrase}
                    onChange={handleChange}
                    placeholder='Search...'
                    className={styles['form-search']}
                    // aria-label='search'
                />
                <label htmlFor='submit' className='visually-hidden'>Find</label>
                <input
                    id='submit'
                    type='submit'
                    // name='submit'
                    value='Find'
                    className={styles['form-submit']}
                />
            </div>
            <label htmlFor='resetArticles' className='visually-hidden'>All articles</label>
            <input
                id='resetArticles'
                type='reset'
                value='All articles'
                className={styles['form-reset']}
            />
            <label htmlFor='resetSections' className='visually-hidden'>All sections</label>
            <input
                id='resetSections'
                type='button'
                value='All sections'
                className={styles['form-reset']}
                onClick={handleResetSections}
            />
        </form>
    );
}
