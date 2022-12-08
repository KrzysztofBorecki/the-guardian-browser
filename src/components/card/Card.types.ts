import type { Author } from '../../types/types';
import type { SearchResponseResults } from '../../types/types';

export interface CardData extends SearchResponseResults {
    author: Author;
}