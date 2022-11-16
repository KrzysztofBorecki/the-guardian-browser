import { ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PAGE_TITLE, 
  TEST_URL, 
  TEST_CARD_DATA_LIST,
} from './Data';
import Sidebar from './Sidebar';
import Results from './Results';
import makeRequest from './AxiosSearch';


interface StateType {
  test: string;
}

export default function App(): ReactElement {

  const [state, setState]= useState<StateType | null>(null);

  useEffect(() => {
    makeRequest();
    setState({test: 'test-text'});
  }, []);

  console.log(state);

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