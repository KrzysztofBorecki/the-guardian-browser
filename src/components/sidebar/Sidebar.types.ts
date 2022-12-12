import { SectionsResponseResults } from '../../types/types';

export interface SidebarProps {
    onSubmit: (searchPhrase: string) => void;
    onReset: () => void;
    onClick: (section: string) => void;
    sectionsData: SectionsResponseResults[] | null;
    searchParams: URLSearchParams;
    isLoading: boolean;
    hasError: boolean;
}
