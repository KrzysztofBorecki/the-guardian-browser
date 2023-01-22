import React, { ReactElement, useState } from 'react';
import { SEARCH_PHRASE_DEFAULT, PAGE_NUMBER_DEFAULT } from '../../utils/constants';
import styles from './SearchForm.module.scss';
import type { ISearchFormProps } from './SearchForm.types';

export default function SearchForm(props: ISearchFormProps): ReactElement {
    const [searchPhrase, setSearchPhrase] = useState<string>(SEARCH_PHRASE_DEFAULT);

    function updateSearchPhrase(event: React.ChangeEvent<HTMLInputElement>): void {
        setSearchPhrase(event.target.value);
    }

    function submitSearchPhrase(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        props.onSearchChange({ 'q': searchPhrase, 'page': PAGE_NUMBER_DEFAULT });
    }

    function resetAll(): void {
        setSearchPhrase(SEARCH_PHRASE_DEFAULT);
        props.onSearchChange({ 'q': '', 'section': '', 'page': PAGE_NUMBER_DEFAULT });
    }

    function resetSections(): void {
        props.onSearchChange({ 'section': '', 'page': PAGE_NUMBER_DEFAULT });
    }

    return (
        <form
            name="search form" 
            onSubmit={submitSearchPhrase}
            onReset={resetAll}
            className={styles.form}>
            <div className={styles['form-panel']}>
                <label htmlFor='search' className='visually-hidden'>Search</label>
                <input
                    id='search'
                    type='search'
                    value={searchPhrase}
                    onChange={updateSearchPhrase}
                    placeholder='Search...'
                    className={styles['form-search']}
                />
                <label htmlFor='submit' className='visually-hidden'>Find</label>
                <input
                    id='submit'
                    type='submit'
                    value='Find'
                    className={styles['form-submit']}
                />
            </div>
            <label htmlFor='resetAll' className='visually-hidden'>All articles</label>
            <input
                id='resetAll'
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
                onClick={resetSections}
            />
        </form>
    );
}
