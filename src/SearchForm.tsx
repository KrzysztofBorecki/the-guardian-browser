import React, { ReactElement, useState } from 'react';
import { SearchFormProps } from './SearchForm.types';

// const getDateFormatEU = (value: string) => `${value[2]}/${value[1]}/${value[0]}`;
// const getDateFormatUS = (value: string) => `${value[1]}/${value[2]}/${value[0]}`;

export default function SearchForm(props: SearchFormProps): ReactElement {
    const [searchPhrase, setSearchPhrase] = useState<string>('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchPhrase(event.target.value);
        event.preventDefault();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        props.onSubmit(searchPhrase);
        event.preventDefault();
    }

    function handleReset(event: React.FormEvent<HTMLFormElement>) {
        setSearchPhrase('');
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
                    value="Find"
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
