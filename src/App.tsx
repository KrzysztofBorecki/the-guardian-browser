import React, { ReactElement, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Results from './Results';
import { getAuthors, PAGE_TITLE} from './Data';
import httpGet from './httpGet';

import type { ResponseSectionsResults, ResponseSearch } from './httpGet.types';
import type { Author } from './Types';


export default function App(): ReactElement {
  const [sections, setSections] = useState<ResponseSectionsResults[] | null>(null);
  const [articles, setArticles] = useState<ResponseSearch | null>(null);

  const [authors, setAuthors] = useState<Author[]>(getAuthors());
  const [searchParams, setSearchParams] = useSearchParams();
  function getObjectFromURLSearchParams(): Record<string, string> {
    return Object.fromEntries(searchParams);
  }

  function handleSubmit(searchPhrase: string): void {
    console.log(`>>>submit: ${searchPhrase}`);
    if (!searchPhrase) return;

    setSearchParams({ q: searchPhrase, page: '1' });
  }

  function handleReset() {
    console.log('>>>reset');
    setSearchParams({ page: '1' });
  }

  useEffect(() => {
    setSearchParams({ page: '1' });
  }, []);

  useEffect(() => {
    httpGet('sections').then(
      (value) => {
        if (!value) return;
        if (typeof value === 'string') return;
        if ('pages' in value) return;
        
        setSections(value.results);
      }
    );

    //__!!__NAPRAWIĆ TYP ANY
    httpGet('search', getObjectFromURLSearchParams()).then(
      (value) => {
        if (!value) return;
        if (typeof value === 'string') return;
        if (!('pages' in value)) return;
        
        setAuthors(getAuthors());
        setArticles(value);
      }
    );
  }, [searchParams]);

  function handlePageDown() {
    if (!searchParams.has('page')) return;

    const currentPage = Number(searchParams.get('page'));

    if (currentPage === 1) return;

    const page = String(currentPage - 1);

    setSearchParams({ ...searchParams, page });
  }

  function handlePageUp() {
    const currentPage = Number(searchParams.get('page'));

    if (!currentPage) return;
    if (!articles) return;
    if (currentPage === articles.pages) return;

    const page = String(currentPage + 1);

    setSearchParams({ ...searchParams, page });
  }

  function handlePageChange(e: React.PointerEvent<HTMLLIElement>) {
    console.log('>>>Page Change');

    if (!articles) return;

    const newPage = Number(e.currentTarget.textContent);

    if (!newPage || newPage === articles.currentPage) return;

    const page = String(newPage);

    setSearchParams({ ...searchParams, page })

    e.preventDefault();
  }

  return (
    <div className='app'>
      {(sections) ?
        <Sidebar
          sectionsData={sections}
          // onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
        // searchQuery={searchQuery}
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