import type { Author, ResponseSearchResults } from './Types';

export interface CardData extends ResponseSearchResults {
    author: Author;
}