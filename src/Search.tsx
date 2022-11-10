const API_KEY_BASE = '&api-key=';
const API_KEY = 'bc1ad419-c748-4289-be70-bc5e1bf855f7';
const API_KEY_URL = `${API_KEY_BASE}${API_KEY}`;

const BASE_URL = 'https://content.guardianapis.com/';

const SEARCH_BASE = 'search?';
const TAGS_BASE = 'tags?'
const TAG_BASE = '&tag='
const QUERY_BASE = 'q=';
const FROM_DATE_BASE = '&from-date='

const searchPhrase = 'elon musk';
const searchKeyWord = 'debate';
const tagKeyWord = 'politics';
const dateSince = '2014-01-01';

function getParsedUrlString(phrase: string): string {
    return phrase.split(' ').join('%20');
}

function getSearchUrl(phrase?: string, tag?: string, dateSinice?: string): string {
    
    const searchUrl: string[] = [];

    if (phrase) {
        const parsedPhrase = getParsedUrlString(phrase);

        searchUrl.push(`${SEARCH_BASE}${QUERY_BASE}${parsedPhrase}`);
    }

    if (!searchUrl[0] && tag) {
        searchUrl.push(`${TAGS_BASE}${QUERY_BASE}${tag}`);
    } else {
        searchUrl.push(`${TAG_BASE}${tag}`);
    } 
    
    if (dateSinice) {
        searchUrl.push(`${FROM_DATE_BASE}${dateSinice}`);
    }

    searchUrl.push(API_KEY_URL);

    return searchUrl.join('');
}

//__Test Url
export const testUrl = getSearchUrl(searchPhrase, tagKeyWord, dateSince);
console.log(testUrl);

export const searchUrl = `${BASE_URL}${SEARCH_BASE}${QUERY_BASE}${searchKeyWord}${TAG_BASE}${tagKeyWord}/${tagKeyWord}&${FROM_DATE_BASE}${dateSince}${API_KEY_URL}`;