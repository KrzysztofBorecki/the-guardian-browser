import axios from 'axios';
import { 
    URL_BASE,
    URL_SEARCH,
    // URL_TAGS,
    QUERY,
    // TAG,
    // FROM_DATE,
    API_KEY,
    API_KEY_NUMBER,
    SEARCH_DEFAULT,
} from './Data';

// in current implementation: 
//      a) ./search?q=<phrase>&api-key=<api-key-number>
//  TO-DO:
//      b) ...

export type ResponseArticlesResults = {
    id:	string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl:	string;
    apiUrl:	string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
}

export type ResponseArticles = {
    status:	string;
    userTier: string;
    total:	number;
    startIndex:	number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: ResponseArticlesResults[]
}

type ResponseAxiosData = {
    response: ResponseArticles;
}

type ResponseAxios = {
    //__data` is the response that was provided by the server
    data: ResponseAxiosData,
  
    //__`status` is the HTTP status code from the server response
    status: number;
  
    //__`statusText` is the HTTP status message from the server response
    statusText: string;
  
    //__`headers` the HTTP headers that the server responded with
    //__All header names are lowercase and can be accessed using the bracket notation.
    //__Example: `response.headers['content-type']`
    //headers: {},
  
    //__`config` is the config that was provided to `axios` for the request
    //config: {},
  
    //__`request` is the request that generated this response
    //__It is the last ClientRequest instance in node.js (in redirects)
    //__and an XMLHttpRequest instance in the browser
    //request: {}
}

export default async function getArticlesData(phrase = SEARCH_DEFAULT) {
    try {
        const response: ResponseAxios = await axios(
            {
                baseURL: URL_BASE,
                url: URL_SEARCH,
                params: {
                    [QUERY]: `${phrase}`,
                    [API_KEY]: API_KEY_NUMBER,
                }
            }
        );

        console.log(response);
        return response.data.response.results;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}