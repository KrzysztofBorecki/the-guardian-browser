import type { SectionsResponseResults } from '../../types/types';

export interface SidebarProps {
    onSubmit: (searchPhrase: string) => void;
    onReset: () => void;
    onClick: (section: string) => void;
    sectionsData: SectionsResponseResults[];
    searchParams: URLSearchParams;
}
