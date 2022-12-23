import { SectionsResponseResults } from '../../types/types';

export interface SidebarProps {
    onSubmit: (searchPhrase: string) => void;
    onResetArticles: () => void;
    onResetSections: () => void;
    onClick: (section: string) => void;
    searchParams: URLSearchParams;
    sectionsData: SectionsResponseResults[] | null;
    isLoading: boolean;
    hasError: boolean;
}
