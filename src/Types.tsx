import type { ResponseSectionsResults } from './AxiosSections';
import type { ResponseArticlesResults, ResponseArticles } from './AxiosArticles';

export interface Author {
    name: string;
    avatar: string;
}

export interface ArticleDataBase {
    title: string;
    date: string;
    tag: string;
    text: string;
    url: string;
}

export type ArticlesDataBase = ArticleDataBase[]

export interface ResultsData {
    title: string;
    data: ResponseArticles;
    authors: Author[];
}

export interface CardData extends ResponseArticlesResults {
    // text: string;
    author: Author;
}

export interface TEST_Category {
    maincategory: string;
    subcategories: string[];
}

export type TEST_Categories = TEST_Category[];

export interface PagesData {
    pagesAll: number;
    pagesCurrent: number;
}

export type Sections = object[];

//__App/Sidebar
export interface SearchFormProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
    onReset: () => void;
    searchQuery: string;
}

//__App/Sidebar/SearchForms
export interface SidebarProps extends SearchFormProps {
    sectionsData: ResponseSectionsResults[];
}