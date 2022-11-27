import type { Author, ResponseSearch } from './Types';

export interface ResultsData {
    title: string;
    data: ResponseSearch;
    authors: Author[];
    onClick: (e: React.PointerEvent<HTMLLIElement>) => void;
    onPageUp: () => void;
    onPageDown: () => void;
}