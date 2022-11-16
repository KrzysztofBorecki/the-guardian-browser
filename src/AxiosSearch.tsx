import axios from 'axios';
import { 
    URL_BASE,
    URL_SEARCH,
    URL_TAGS,
    QUERY,
    TAG,
    FROM_DATE,
    API_KEY,
    API_KEY_NUMBER,
} from './Data';

// makeRequest === <Promise> 'resolved' z <value> === () => retur <value></value>
export default async function makeRequest() {
    try {
        // reposnes === <obiekt> 
        const response = await axios(
            {
                baseURL: URL_BASE,
                url: URL_SEARCH,
                params: {
                    [QUERY]: '"elon musk"',
                    [API_KEY]: API_KEY_NUMBER,
                }
            }
        );

        console.log(response)

    } catch (err) {
        console.log(err);
    }
}

// const URL_ENDPOINT = (URL_SEARCH_ENDPOINT) ? URL_SEARCH_ENDPOINT : URL_TAGS_ENDPOINT;

// const requestConfig = {
//     method: 'get',
//     url: URL_BASE,
//     params: {
//         [QUERY_BASE]: 'elon musk',
//     }
// }
// console.log(requestConfig);

//__AXIOS
//__
// export default async function makeRequest() {
//     try {
//__
//__AXIOS: axios()
//__
//         const response1 = await axios(
//             {
//                 baseURL: 'https://content.guardianapis.com',
//                 url: '/search',
//                 params: {
//                     q: '"elon musk"',
//                     'api-key': API_KEY,
//                 }
//             }
//         );
//__
//__AXIOS: axios.get()
//__
//         const response2 = await axios.get(
//             '/search',
//             {
//                 baseURL: 'https://content.guardianapis.com',
//                 params: {
//                     q: '"donald tusk"',
//                     'api-key': API_KEY,
//                 }
//             }
//         );

//         console.log(response1)
//         console.log(response2);
//     } catch (err) {
//         console.log(err);
//     }
// }