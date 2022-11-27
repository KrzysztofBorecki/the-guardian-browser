export interface SearchFormProps {
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (searchPhrase: string) => void;
    onReset: () => void;
    // searchPhrase: string;
}