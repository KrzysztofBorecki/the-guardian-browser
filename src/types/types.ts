export interface ISearchResponseResults {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
}

export interface ISearchResponseResultsMocked extends ISearchResponseResults {
    author: IAuthor;
    text: string;
}

export interface ISearchResponse {
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: ISearchResponseResults[];
}

export interface ISearchResponseMocked {
    currentPage: number;
    pages: number;
    results: ISearchResponseResultsMocked[];
}

export interface ISectionsResponseResults {
    id: string;
    webTitle: string;
    webUrl: string;
}

export interface ISectionsResponse {
    results: ISectionsResponseResults[];
}

export interface IAuthor {
    name: string;
    avatar: string;
}

export interface ISearchParams {
    q?: string,
    section?: string,
    page: string,
}