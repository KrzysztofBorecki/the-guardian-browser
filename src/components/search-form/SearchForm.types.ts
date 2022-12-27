export interface SearchFormProps {
    onSubmit: (searchPhrase: string) => void;
    onResetAll: () => void;
    onResetSection: () => void;
}