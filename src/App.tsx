import React, { ReactElement, useState, useEffect } from 'react';
import getSectionsData from './AxiosSections';
import getArticlesData from './AxiosArticles';
import Sidebar from './Sidebar';
import Results from './Results';
import { getAuthors, PAGE_TITLE} from './Data';
import type { ResponseSectionsResults } from './AxiosSections';
import type { ResponseArticles, ResponseArticlesResults } from './AxiosArticles';

const TEST_PHRASE = 'nasa artemis'

export default function App(): ReactElement {
  const [sections, setSections] = useState<ResponseSectionsResults[] | null>(null);
  const [articles, setArticles] = useState<ResponseArticles | null>(null);
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


  // implement page=<number -1>
  function handlePageDown() {
    
  }
  
  // implement page=<number + 1>
  function handlePageUp() {
    
  }
  
  // implement page=<selected number>
  function handlePageChange() {

  }

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
  console.log("ARTICLES")
  console.log(articles);

  return (
    <div className='app'>
      {(sections) ? 
        <Sidebar 
          sectionsData={sections} 
          onChange={handleChange} 
          onSubmit={handleSubmit} 
          onReset={handleReset}
          searchQuery={searchQuery} 
        /> : null}
      {(articles) ? 
        <Results
          title={PAGE_TITLE}
          data={articles}
          authors={getAuthors()}
      /> : null}
    </div>
  );
}