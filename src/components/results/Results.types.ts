import { Author, SearchResponse } from '../../types/types';

export interface DataResults {
    title: string;
    data: SearchResponse;
    authors: Author[];
    onClick: (value: number) => void;
}