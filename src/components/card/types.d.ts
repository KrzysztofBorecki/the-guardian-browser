import { Author } from '../../types/types';
import { SearchResponseResults } from '../../types/types';

export interface CardData extends SearchResponseResults {
    author: Author;
}