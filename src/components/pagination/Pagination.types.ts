export interface IPaginationProps {
    pagesAll: number;
    pagesCurrent: number;
    onClick: (value: number) => void;
}