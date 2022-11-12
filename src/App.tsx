// import React from 'react';
import axios from 'axios';
import { ReactElement, useState, useEffect } from 'react';

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

const TEST_MAIN_CATEGORIES = [
  'News',
  'Opinion',
  'Sport',
  'Culture',
  'Lifestyle',
];

const TEST_CATEGORIES = [
  {
    category: 'News',
    subcategories: [
      'World news',
      'UK news',
      'Coronavirus',
      'Climate crisis',
      'Environment',
      'Science',
      'Global development',
      'Football',
      'Tech',
      'Business',
      'Obituaries',
    ],
  },
  {
    category: 'Opinion',
    subcategories: [
      'The Guardian view',
      'Columnists',
      'Cartoons',
      'Opinion videos',
      'Letters',
    ],
  },
  {
    category: 'Sport',
    subcategories: [
      'Football',
      'Cricket',
      'Rugby union',
      'Tennis',
      'Cycling',
      'F1',
      'Golf',
      'US sports',
    ],
  },
  {
    category: 'Culture',
    subcategories: [
      'Music',
      'Books',
      'TV & radio',
      'Art & design',
      'Film',
      'Games',
      'Classical',
      'Stage',
    ],
  },
  {
    category: 'Lifestyle',
    subcategories: [
      'Fashion',
      'Food',
      'Recipes',
      'Love & sex',
      'Health & fitness',
      'Home & garden',
      'Women',
      'Men',
      'Family',
      'Travel',
      'Money',
    ],
  },
];

console.log(TEST_CATEGORIES);

const TEST_DATA_ARRAY = [TEST_DATA, TEST_DATA, TEST_DATA];

const getDateFormatEU = (value: string) => `${value[2]}/${value[1]}/${value[0]}`;
const getDateFormatUS = (value: string) => `${value[1]}/${value[2]}/${value[0]}`;

//__TEST URL
// const url = `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&${API_KEY_URL}`;

// const getResponseByAxios = async (url: string) => {
//   // try {
//     // const response = await axios.get(url);
//      const response = await axios.get(url);
//     // tu już mam obiekt
//     // console.log(response);
//     return response;
//     // tu funkcja - zwraca Promise z value: <wartość zmiennej response>
//   // } catch (err) {
//   //   console.log(err);
//   // }
// }
// getResponseByAxios(searchUrl);
// console.log(getResponseByAxios(searchUrl));



export default function App(): ReactElement {

  const [state, setState]: [any | undefined, any] = useState(null);

  //__TEST URL
  // const url = `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&${API_KEY_URL}`;

  // getResponseByAxios === <Promise> 'resolved' z <value> === () => retur <value>
  const getResponseByAxios = async (url: string) => {
    try {
      const response = await axios.get(url);
      // reposnes === <obiekt>      
      setState(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getResponseByAxios(searchUrl);
  }, []);

  console.log(state);

  return (
    <div className='app'>
      <Sidebar categories={TEST_MAIN_CATEGORIES} />
      <Results
        title={PAGE_TITLE}
        data={TEST_DATA_ARRAY}
      />
    </div>
  );
}