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

  // function getObjectFromURLSearchParams(): Record<string, string> {
  //   return Object.fromEntries(searchParams);
  // }

  function handleSubmit(searchPhrase: string): void {
    if (!searchPhrase) return;

    setSearchParams({ q: searchPhrase, page: '1' });
  }

  function handleReset() {
    setSearchParams({ page: '1' });
  }

  function handleClick(section: string) {
    setSearchParams({ section });
  }

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
    if (!articles) return;

    const newPage = Number(e.currentTarget.textContent);

    if (!newPage || newPage === articles.currentPage) return;

    const page = String(newPage);

    setSearchParams({ ...searchParams, page })

    e.preventDefault();
  }

  // useEffect(() => {
  //   setSearchParams({ page: '1' });
  // }, []);

  useEffect(() => {
    httpGet('sections').then(
      (value) => {
        if (!value) return;
        if (typeof value === 'string') return;
        if ('pages' in value) return;
        
        setSections(value.results);
      }
    );

    httpGet('search', Object.fromEntries(searchParams)).then(
      (value) => {
        if (!value) return;
        if (typeof value === 'string') return;
        if (!('pages' in value)) return;
        
        setAuthors(getAuthors());
        setArticles(value);
      }
    );
  }, [searchParams]);

  return (
    <div className='app'>
      {(sections) ?
        <Sidebar
          sectionsData={sections}
          searchParams={searchParams}
          onSubmit={handleSubmit}
          onReset={handleReset}
          onClick={handleClick}
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