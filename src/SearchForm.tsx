import { ReactElement } from 'react';

const getDateFormatEU = (value: string) => `${value[2]}/${value[1]}/${value[0]}`;
const getDateFormatUS = (value: string) => `${value[1]}/${value[2]}/${value[0]}`;

export default function SearchForm() {
    return (
        <div>Search + Submit btn</div>
    );
}
