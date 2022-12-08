import type { SectionsResponseResults } from '../../types/types';

export interface SectionsData {
    sectionsData: SectionsResponseResults[];
    searchParams: URLSearchParams;
    onClick: (section: string) => void;
}