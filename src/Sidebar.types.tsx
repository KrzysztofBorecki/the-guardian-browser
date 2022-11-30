import type { ResponseSectionsResults } from './Types';

export interface SidebarProps {
    onSubmit: (searchPhrase: string) => void;
    onReset: () => void;
    onClick: (section: string) => void;
    sectionsData: ResponseSectionsResults[];
    searchParams: URLSearchParams;
}
