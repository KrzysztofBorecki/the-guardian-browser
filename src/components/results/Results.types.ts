import type { Author } from '../../types/types';
import type { SearchResponse } from '../../types/types';

export interface ResultsData {
    title: string;
    data: SearchResponse;
    authors: Author[];
    onClick: (e: React.PointerEvent<HTMLLIElement>) => void;
    onPageUp: () => void;
    onPageDown: () => void;
}