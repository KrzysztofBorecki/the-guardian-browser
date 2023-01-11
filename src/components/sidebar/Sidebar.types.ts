import { ISectionsResponseResults, ISearchParams } from '../../types/types';

export interface ISidebarProps {
    onSearchChange: (data: ISearchParams) => void;
    onClick: (section: string) => void;
    searchParams: URLSearchParams;
    sectionsData: ISectionsResponseResults[] | null;
    isLoading: boolean;
    hasError: boolean;
}
