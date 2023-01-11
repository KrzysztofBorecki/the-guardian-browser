import { getRandomAuthor } from './authors.mock';
import { getRandomLorem } from './lorem.mock';
import type { ISearchResponse } from '../types/types';

export function getArticlesMock(data: ISearchResponse) {
    return {
        'results': data.results.map((value) => {
            return (
                {
                    ...value,
                    'author': getRandomAuthor(),
                    'text': getRandomLorem(50),
                }
            );
        }),
        'currentPage': data.currentPage,
        'pages': data.pages,
    }
}