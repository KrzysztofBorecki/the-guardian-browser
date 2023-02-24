import { ISearchResponseMocked } from '../../types/types';

export interface IArticlesListProps {
    title: string;
    data: ISearchResponseMocked | null;
    onClick: (value: number) => void;
    hasError: boolean;
    isLoading: boolean;
}