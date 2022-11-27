// import type { ResponseSectionsResults } from './AxiosSections';
// import type { ResponseArticlesResults, ResponseArticles } from './AxiosArticles';


export type ResponseSectionsResults = {
    apiUrl: string;
    id: string;
    webTitle: string;
    webUrl: string;
}

export type ResponseArticlesResults = {
    id:	string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl:	string;
    apiUrl:	string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
}

type ResponseArticles = {
    status:	string;
    userTier: string;
    total:	number;
    startIndex:	number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: ResponseArticlesResults[]
}

//__App/Results
export interface Author {
    name: string;
    avatar: string;
}

export interface ResultsData {
    title: string;
    data: ResponseArticles;
    authors: Author[];
    onClick: (e: React.PointerEvent<HTMLLIElement>) => void;
    onPageUp: () => void;
    onPageDown: () => void;
}

//__App/Results/Card
export interface CardData extends ResponseArticlesResults {
    // text: string;
    author: Author;
}

//__App/Results/Pagination
export interface PagesData {
    pagesAll: number;
    pagesCurrent: number;
    onClick: (e: React.PointerEvent<HTMLLIElement>) => void;
    onPageUp: () => void;
    onPageDown: () => void;
}

export type Sections = object[];

//__App/Sidebar
export interface SearchFormProps {
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (searchPhrase: string) => void;
    onReset: () => void;
    // searchPhrase: string;
}

//__App/Sidebar/SearchForms
export interface SidebarProps {
    onSubmit: (searchPhrase: string) => void;
    onReset: () => void;
    sectionsData: ResponseSectionsResults[];
}


//__!!__DODAĆ GENERYKI DLA AXIOS:
// type GenericType<T> = {
//     data: T; 
// }

// const variableA: GenericType<number> = {data: 10};      // ok
// const variableB: GenericType<number> = {data: 'error'}; // error - nie mozna przypisac do typu number
// const variableC: GenericType<number> = 10;              // error - nie można przypisać do typu GenericType<number>


//__DEPRECATED__START=>>REMOVE
// export interface ArticleDataBase {
//     title: string;
//     date: string;
//     tag: string;
//     text: string;
//     url: string;
// }

// export type ArticlesDataBase = ArticleDataBase[]

// export interface TEST_Category {
//     maincategory: string;
//     subcategories: string[];
// }

// export type TEST_Categories = TEST_Category[];

//__DEPRECATED__END