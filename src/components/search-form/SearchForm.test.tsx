import SearchForm from './SearchForm';
import { fireEvent, render, screen } from '@testing-library/react';
import { ISearchFormProps } from './SearchForm.types';
import { ISearchParams } from '../../types/types';
import { PAGE_NUMBER_DEFAULT } from '../../utils/constants';

describe(`SearchForm`, () => {
    it(`should render component`, () => {
        const mockedSearchFormProps: ISearchFormProps = {
            onSearchChange: jest.fn((value: ISearchParams) => value),
        };

        render(<SearchForm onSearchChange={mockedSearchFormProps.onSearchChange} />);

        const searchForm = screen.getByRole('form');
        const searchbox = screen.getByRole('searchbox', { name: /search/i });
        const submit = screen.getByRole('button', { name: /find/i });
        const resetArticles = screen.getByRole('button', { name: /all articles/i });
        const resetSections = screen.getByRole('button', { name: /all sections/i });

        expect(searchForm).toBeInTheDocument();
        expect(searchbox).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
        expect(resetArticles).toBeInTheDocument();
        expect(resetSections).toBeInTheDocument();
    });

    describe(`entering search phrase`, () => {
        it(`should update searchbox input value`, () => {
            const mockedSearchFormProps: ISearchFormProps = {
                onSearchChange: jest.fn((value: ISearchParams) => value),
            };

            render(<SearchForm onSearchChange={mockedSearchFormProps.onSearchChange} />);

            const searchbox: HTMLInputElement = screen.getByRole('searchbox', { name: /search/i });

            fireEvent.change(searchbox, { target: { value: 'test-search-phrase' } });

            expect(searchbox.value).toBe('test-search-phrase');
        });
    });

    describe(`submitting search phrase`, () => {
        it(`should call callback with right arguments`, () => {
            const mockedSearchFormProps: ISearchFormProps = {
                onSearchChange: jest.fn((value: ISearchParams) => value),
            };

            render(<SearchForm onSearchChange={mockedSearchFormProps.onSearchChange} />);

            const searchForm = screen.getByRole('form');
            const searchbox: HTMLInputElement = screen.getByRole('searchbox', { name: /search/i });

            fireEvent.change(searchbox, { target: { value: 'test-search-phrase' } });
            fireEvent.submit(searchForm);

            expect(searchbox.value).toBe('test-search-phrase');
            expect(mockedSearchFormProps.onSearchChange).toHaveBeenCalledWith({ 'q': 'test-search-phrase', 'page': PAGE_NUMBER_DEFAULT });
        });
    });

    describe(`resetting to all articles`, () => {
        it(`should call callback with right arguments`, () => {
            const mockedSearchFormProps: ISearchFormProps = {
                onSearchChange: jest.fn((value: ISearchParams) => value),
            };

            render(<SearchForm onSearchChange={mockedSearchFormProps.onSearchChange} />);

            const resetArticles = screen.getByRole('button', { name: /all articles/i });

            fireEvent.click(resetArticles);

            expect(mockedSearchFormProps.onSearchChange).toHaveBeenCalledWith({ 'q': '', 'section': '', 'page': PAGE_NUMBER_DEFAULT });
        });
    });

    describe(`resetting to all sections`, () => {
        it(`should call callback with right arguments`, () => {
            const mockedSearchFormProps: ISearchFormProps = {
                onSearchChange: jest.fn((value: ISearchParams) => value),
            };

            render(<SearchForm onSearchChange={mockedSearchFormProps.onSearchChange} />);

            const resetSections = screen.getByRole('button', { name: /all sections/i });

            fireEvent.click(resetSections);

            expect(mockedSearchFormProps.onSearchChange).toHaveBeenCalledWith({ 'section': '', 'page': PAGE_NUMBER_DEFAULT });
        });
    });
});