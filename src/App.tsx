import React, { ReactElement, useState, useEffect } from 'react';
import getSectionsData from './AxiosSections';
import getArticlesData from './AxiosArticles';
import getArticlesDataFromPage from './AxiosPage'
import Sidebar from './Sidebar';
import Results from './Results';
import { getAuthors, PAGE_TITLE, SEARCH_DEFAULT } from './Data';

import type { ResponseSectionsResults } from './AxiosSections';
import type { ResponseArticles, ResponseArticlesResults } from './AxiosArticles';
import type { Author } from './Types';

export default function App(): ReactElement {
  const [sections, setSections] = useState<ResponseSectionsResults[] | null>(null);
  const [articles, setArticles] = useState<ResponseArticles | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(SEARCH_DEFAULT);
  const [searchSection, setSearchSection] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>(getAuthors());

 

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

    if (searchQuery !== '') {
      getArticlesData(searchQuery).then(
        (value) => {
          if (value && typeof value !== 'string') {
            console.log(value);

            setAuthors(getAuthors());
            setArticles(value);
          }
        }
      );
    }
    event.preventDefault();
  }

  //__PROBLEM-1
  //__searchQuery aktualizuje się po wykonaniu requestu
  //__w efekcie request wykonywany jest ze starą wartością searchQuery
  //__jeżeli układ wygląda tak:
  //  {
  //    setSearchQuery('');
  //    getArticlesData(searchQuery).then();
  //}

  async function handleReset(event: React.FormEvent<HTMLFormElement>) {
    console.log('>>>reset');

    getArticlesData(SEARCH_DEFAULT).then(
      (value) => {
        if (value && typeof value !== 'string') {
          setArticles(value);
        }
      }
    );

    setSearchQuery(SEARCH_DEFAULT);
    event.preventDefault();
  }

  useEffect(() => {
    getSectionsData().then(
      (value) => {
        if (value && typeof value !== 'string') {
          setSections(value);
        }
      }
    );

    getArticlesData(searchQuery).then(
      (value) => {
        if (value && typeof value !== 'string') {
          setArticles(value);
        }
      }
    );
  }, []);


  function handlePageDown() {
    console.log('>>>Page Down')

    if (!articles) return
    if (!searchQuery) return

    const currentPage = articles.currentPage;

    getArticlesDataFromPage(searchQuery, currentPage - 1).then(
      (value) => {
        if (value && typeof value !== 'string') {
          setAuthors(getAuthors());
          setArticles(value);
        }
      }
    );
  }

  function handlePageUp() {
    console.log('>>>Page Up')

    if (!articles) return
    if (!searchQuery) return

    const currentPage = articles.currentPage;

    getArticlesDataFromPage(searchQuery, currentPage + 1).then(
      (value) => {
        if (value && typeof value !== 'string') {
          setAuthors(getAuthors());
          setArticles(value);
        }
      }
    );
  }

  function handlePageChange(e: React.PointerEvent<HTMLLIElement>) {
    console.log('>>>Page Change');
    
    if (!articles) return;
    
    const newPage = Number(e.currentTarget.textContent);
    
    if (!newPage || newPage === articles.currentPage) return;
    getArticlesDataFromPage(searchQuery, newPage).then(
      (value) => {
        if (value && typeof value !== 'string') {         
          setAuthors(getAuthors());
          setArticles(value);
        }
      }
    );
    e.preventDefault();
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

  return (
    <div className='app'>
      {(sections) ?
        <Sidebar
          sectionsData={sections}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          searchQuery={searchQuery}
        /> :
        null}
      {(articles) ?
        <Results
          title={PAGE_TITLE}
          data={articles}
          authors={authors}
          onClick={handlePageChange}
          onPageUp={handlePageUp}
          onPageDown={handlePageDown}
        /> :
        null}
    </div>
  );
}