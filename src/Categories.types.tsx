import type { ResponseSectionsResults } from './Types';

export interface SectionsData {
    sectionsData: ResponseSectionsResults[];
    onClick: (section: string) => void;
    searchParams: URLSearchParams;
}