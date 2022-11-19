import { ReactElement } from 'react';
import { SearchFormProps } from './Types';

const getDateFormatEU = (value: string) => `${value[2]}/${value[1]}/${value[0]}`;
const getDateFormatUS = (value: string) => `${value[1]}/${value[2]}/${value[0]}`;

export default function SearchForm(props: SearchFormProps): ReactElement {
    return (
        <>
            <form onSubmit={props.onSubmit} onReset={props.onReset} className='form'>
                <div className='form-panel'>
                    <label htmlFor='search' hidden={true}>Search</label>
                    <input 
                        id='search' 
                        type='text' 
                        name='search' 
                        value={props.searchQuery} 
                        onChange={props.onChange} 
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
        </>
    );
}
