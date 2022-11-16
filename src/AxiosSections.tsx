import axios from 'axios';
import { 
    URL_BASE,
    URL_SECTIONS,
    API_KEY,
    API_KEY_NUMBER,
} from './Data';

import type { Sections } from './App';

type State = React.Dispatch<React.SetStateAction<Sections | null>>

export default async function sectionRequest(setSections: State) {
    try {
        const response = await axios({
            baseURL: URL_BASE,
            url: URL_SECTIONS,
            params: {
                [API_KEY]: API_KEY_NUMBER,
            }
        });
        console.log(response);
        const sections = response.data.response.results;
        console.log(sections);
        setSections(sections);
    } catch (err) {
        console.log(err);
    }
}