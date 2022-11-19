import { ResponseSectionsResults } from './AxiosSections';

export interface Author {
    name: string;
    avatar: string;
}

export interface ArticleDataBase {
    title: string;
    date: string;
    tag: string;
    text: string;
}

export type ArticlesDataBase = ArticleDataBase[]

export interface ResultsData {
    title: string;
    data: ArticlesDataBase;
    authors: Author[];
}

export interface CardData {
    title: string;
    date: string;
    tag: string;
    text: string;
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