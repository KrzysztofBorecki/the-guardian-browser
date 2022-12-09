import { Author } from '../../types/types';
import { SearchResponseResults } from '../../types/types';

export interface DataCard extends SearchResponseResults {
    author: Author;
}