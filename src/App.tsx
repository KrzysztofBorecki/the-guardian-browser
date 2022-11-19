import React, { ReactElement, useState, useEffect } from 'react';
import getSectionsData from './AxiosSections';
import getArticlesData from './AxiosArticles';
import Sidebar from './Sidebar';
import Results from './Results';
import { getAuthors, PAGE_TITLE, TEST_CARD_DATA_LIST } from './Data';
import type { ResponseSectionsResults } from './AxiosSections';
import type { ResponseArticlesResults } from './AxiosArticles';

const TEST_PHRASE = 'nasa artemis'

export default function App(): ReactElement {
  const [sections, setSections] = useState<ResponseSectionsResults[] | null>(null);
  const [articles, setArticles] = useState<ResponseArticlesResults[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | ''>('');
  const [searchSection, setSearchSection] = useState<string | null>(null);

  function handleSectionPick(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('>>>section pick')
    setSearchSection(event.target.value);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('>>>change')
    setSearchQuery(event.target.value);
    event.preventDefault();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log('>>>submit')
    if(searchQuery) setSearchQuery(searchQuery.toString());
    event.preventDefault();
  }

  function handleReset() {
    console.log('>>>reset')
    setSearchQuery('news');
  }


  useEffect(() => {
    getSectionsData().then(
      (value) => {
        if (value && typeof value !== 'string') {
          console.log(value);
          setSections(value);
        }
      }
    ); 

    getArticlesData().then(
      (value) => {
        if (value && typeof value !== 'string') {
          console.log(value);
          setArticles(value);
        }
      }
    );
  }, []);

  // useEffect(() => {
  //   getArticlesData(TEST_PHRASE).then(
  //     (value) => {
  //       if (value && typeof value !== 'string') {
  //         console.log(value);
  //         setArticles(value);
  //       }
  //     }
  //   );
  // }, []);

  return (
    <div className='app'>
      {(sections) ? <Sidebar 
        sectionsData={sections} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        onReset={handleReset}
        searchQuery={searchQuery} 
        /> : null}
      <Results
        title={PAGE_TITLE}
        data={TEST_CARD_DATA_LIST}
        authors={getAuthors()}
      />
    </div>
  );
}