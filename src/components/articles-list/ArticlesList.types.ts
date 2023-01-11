import { ISearchResponseMocked } from '../../types/types';

export interface IArticlesListProps {
    title: string;
    data: ISearchResponseMocked;
    onClick: (value: number) => void;
}