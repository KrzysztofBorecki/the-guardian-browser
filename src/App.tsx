// import React from 'react';
import axios from 'axios';
import { ReactElement } from 'react';

import { searchUrl, testUrl } from './Search';

import Sidebar from './Sidebar';
import Results from './Results';

//__TEST VARIABLES
const PAGE_TITLE = 'The Guardian Browser';
const TEST_TITLE = 'Test Article Title';
const TEST_DATE_EU = '24/10/2022';
const TEST_TAG = 'politics';
const TEST_TEXT = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea suscipit fuga quisquam eos, quaerat non at eum eius quia ut deserunt sed, aliquid qui explicabo totam nulla velit modi vitae.'
const TEST_DATA = {
  title: TEST_TITLE,
  date: TEST_DATE_EU,
  tag: TEST_TAG,
  text: TEST_TEXT,
}

const getDateFormatEU = (value: string) => `${value[2]}/${value[1]}/${value[0]}`;
const getDateFormatUS = (value: string) => `${value[1]}/${value[2]}/${value[0]}`;

//__TEST URL
// const url = `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&${API_KEY_URL}`;

const getResponseByAxios = async (url: string) => {
  const response = await axios.get(url);
  // tu już mam obiekt
  console.log(response);
  return response;
  // tu funkcja - zwraca Promise z value: <wartość zmiennej response>
}
getResponseByAxios(searchUrl);
console.log(getResponseByAxios(searchUrl));

export default function App(): ReactElement {
  return (
    <div>
      <Sidebar />
      <Results 
        title={PAGE_TITLE}
        data={TEST_DATA}
      />
    </div>	
  );
}