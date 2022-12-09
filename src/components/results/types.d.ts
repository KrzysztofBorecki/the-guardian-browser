import { Author } from '../../types/types';
import { SearchResponse } from '../../types/types';

export interface ResultsData {
    title: string;
    data: SearchResponse;
    authors: Author[];
    onClick: (e: React.PointerEvent<HTMLLIElement>) => void;
    onPageUp: () => void;
    onPageDown: () => void;
}