import { Author, SearchResponse } from '../../types/types';

export interface DataResults {
    title: string;
    data: SearchResponse;
    authors: Author[];
    onClick: (e: React.PointerEvent<HTMLLIElement>) => void;
    onPageUp: () => void;
    onPageDown: () => void;
}