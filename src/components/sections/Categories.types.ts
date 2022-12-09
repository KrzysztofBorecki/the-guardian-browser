import type { SectionsResponseResults } from '../../types/types';

export interface DataSections {
    sectionsData: SectionsResponseResults[];
    searchParams: URLSearchParams;
    onClick: (section: string) => void;
}