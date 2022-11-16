import { ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PAGE_TITLE, 
  TEST_URL, 
  TEST_CARD_DATA_LIST,
} from './Data';
import Sidebar from './Sidebar';
import Results from './Results';
import sectionsRequest from './AxiosSections';
import makeRequest from './AxiosSearch';

export type Sections = object[];

export default function App(): ReactElement {

  const [sections, setSections]= useState<Sections | null>(null);

  useEffect(() => {
    sectionsRequest(setSections);
    makeRequest();
  }, []);

  return (
    <div className='app'>
      <Sidebar />
      <Results
        title={PAGE_TITLE}
        data={TEST_CARD_DATA_LIST}
      />
    </div>
  );
}