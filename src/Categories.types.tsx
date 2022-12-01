import type { ResponseSectionsResults } from './Types';

export interface SectionsData {
    sectionsData: ResponseSectionsResults[];
    searchParams: URLSearchParams;
    onClick: (section: string) => void;
}