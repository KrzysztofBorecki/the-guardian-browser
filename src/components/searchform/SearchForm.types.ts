export interface SearchFormProps {
    onSubmit: (searchPhrase: string) => void;
    onResetArticles: () => void;
    onResetSections: () => void;
}