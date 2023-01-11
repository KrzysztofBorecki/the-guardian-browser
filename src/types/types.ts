export interface ISearchResponseResults {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
}

export interface ISearchResponseResultsMocked extends ISearchResponseResults {
    author: IAuthor;
    text: string;
}

export interface ISearchResponse {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: ISearchResponseResults[];
}

export interface ISearchResponseMocked {
    currentPage: number;
    pages: number;
    results: ISearchResponseResultsMocked[];
}

export interface ISectionsResponseResults {
    apiUrl: string;
    id: string;
    webTitle: string;
    webUrl: string;
}

export interface ISectionsResponse {
    results: ISectionsResponseResults[];
    status: string;
    total: string;
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