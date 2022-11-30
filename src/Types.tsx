export type ResponseSectionsResults = {
    apiUrl: string;
    id: string;
    webTitle: string;
    webUrl: string;
}

export type ResponseSearchResults = {
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

export type ResponseSearch = {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: ResponseSearchResults[];
}

export interface Author {
    name: string;
    avatar: string;
}

export type Sections = object[];