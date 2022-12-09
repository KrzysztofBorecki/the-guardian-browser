import type { SearchResponseResults, Author } from '../../types/types';

export interface DataCard extends SearchResponseResults {
    author: Author;
}