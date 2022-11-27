import type { ResponseSectionsResults } from './Types';

export interface SidebarProps {
    onSubmit: (searchPhrase: string) => void;
    onReset: () => void;
    sectionsData: ResponseSectionsResults[];
}
