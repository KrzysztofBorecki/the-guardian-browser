import type { ISectionsResponseResults } from '../../types/types';

export interface ISectionsProps {
    sectionsData: ISectionsResponseResults[];
    searchParams: URLSearchParams;
    onClick: (section: string) => void;
}