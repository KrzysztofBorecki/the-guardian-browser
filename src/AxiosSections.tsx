import axios from 'axios';
import { 
    URL_BASE,
    URL_SECTIONS,
    API_KEY,
    API_KEY_NUMBER,
} from './Data';

// type Section = {
//     apiUrl: string;
//     id: string;
//     isHosted: string;
//     pillarId: string;
//     pillarName: string;
//     sectionId: string;
//     sectionName: string;
//     type: string;
//     webPublicationDate: string;
//     webTitle: string;
//     webUrl: string;
// }

// export type Sections = Section[]

// export type ResponseWithSections = {
//     results: Section[];
// }

export type ResponseSectionsResults = {
    apiUrl: string;
    id: string;
    webTitle: string;
    webUrl: string;
}

export type ResponseSections = {
   results: ResponseSectionsResults[]
   status: string;
   total: string;
}

type ResponseAxiosData = {
    response: ResponseSections;
}

export type ResponseAxios = {
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


export default async function getSectionsData() {
    try {
        const response: ResponseAxios = await axios({
            baseURL: URL_BASE,
            url: URL_SECTIONS,
            params: {
                [API_KEY]: API_KEY_NUMBER,
            }
        });

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