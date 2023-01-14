import SearchForm from './SearchForm';
import { render, screen } from '@testing-library/react';

describe("components/search-form", () => {
    it('should render "Search" form input', () => {
        render(<SearchForm />);
        const element= screen.getByRole('searchbox', {name: /search/i});
        expect(element).toBeInTheDocument();
    });

    it('should render "Find" form input', () => {
        render(<SearchForm />);
        const element= screen.getByRole('button', {name: /find/i});
        expect(element).toBeInTheDocument();
    });

    it('should render "All sections" form input', () => {
        render(<SearchForm />);
        const element= screen.getByRole('button', {name: /all sections/i});
        expect(element).toBeInTheDocument();
    });
});