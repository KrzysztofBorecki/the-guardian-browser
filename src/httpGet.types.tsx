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

export type ResponseArticles = {
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

export type ResponseSectionsResults = {
    apiUrl: string;
    id: string;
    webTitle: string;
    webUrl: string;
}

export type ResponseSections = {
   results: ResponseSectionsResults[]
   status: string;
   total: string;
}

export type ResponseData = {
    response: ResponseArticles | ResponseSections;
}