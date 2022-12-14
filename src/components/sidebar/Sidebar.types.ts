import { SectionsResponseResults } from '../../types/types';

export interface SidebarProps {
    onSubmit: (searchPhrase: string) => void;
    onReset: () => void;
    onClick: (section: string) => void;
    searchParams: URLSearchParams;
    sectionsData: SectionsResponseResults[] | null;
    isLoading: boolean;
    hasError: boolean;
}
