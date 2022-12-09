export interface SearchResponseResults {
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

export interface SearchResponse {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: SearchResponseResults[];
}

export interface SectionsResponseResults {
    apiUrl: string;
    id: string;
    webTitle: string;
    webUrl: string;
}

export interface SectionsResponse {
    results: SectionsResponseResults[];
    status: string;
    total: string;
}

export interface DataResponse {
    response: SearchResponse | SectionsResponse;
}

export interface Author {
    name: string;
    avatar: string;
}