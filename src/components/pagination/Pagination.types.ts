export interface DataPages {
    pagesAll: number;
    pagesCurrent: number;
    onClick: (e: React.PointerEvent<HTMLLIElement>) => void;
    onPageUp: () => void;
    onPageDown: () => void;
}