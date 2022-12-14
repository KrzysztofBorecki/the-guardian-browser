import React, { ReactElement, useState } from 'react';
import { SEARCH_PHRASE_DEFAULT } from '../../utils/data';
// import { useSearchParams } from 'react-router-dom';
// import { PAGE_NUMBER_DEFAULT } from '../../utils/data';
import type { SearchFormProps } from './SearchForm.types';

export default function SearchForm(props: SearchFormProps): ReactElement {
// export default function SearchForm(): ReactElement {
    const [searchPhrase, setSearchPhrase] = useState<string>(SEARCH_PHRASE_DEFAULT);
    // const setSearchParams = useSearchParams()[1];

    // function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    //     if (!searchPhrase) return;

    //     setSearchParams({ q: searchPhrase, page: PAGE_NUMBER_DEFAULT });
    //     event.preventDefault();
    // }

    // function handleReset(event: React.FormEvent<HTMLFormElement>) {
    //     setSearchPhrase(SEARCH_PHRASE_DEFAULT);
    //     setSearchParams({ page: PAGE_NUMBER_DEFAULT });
    //     event.preventDefault();
    // }
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchPhrase(event.target.value);
        event.preventDefault();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        props.onSubmit(searchPhrase);
        event.preventDefault();
    }

    function handleReset(event: React.FormEvent<HTMLFormElement>) {
        setSearchPhrase(SEARCH_PHRASE_DEFAULT);
        props.onReset();
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className='form'>
            <div className='form-panel'>
                <label htmlFor='search' hidden={true}>Search</label>
                <input
                    id='search'
                    type='text'
                    name='search'
                    value={searchPhrase}
                    onChange={handleChange}
                    placeholder='Search...'
                    className='form-search'
                />
                <label htmlFor='submit' hidden={true}>Submit</label>
                <input
                    id='submit'
                    type='submit'
                    name='submit'
                    value='Find'
                    className='form-submit'
                />
            </div>
            <label htmlFor='reset' hidden={true}>All articles</label>
            <input
                id='reset'
                type='reset'
                name='reset'
                value='All articles'
                className='form-reset'
            />
        </form>
    );
}
