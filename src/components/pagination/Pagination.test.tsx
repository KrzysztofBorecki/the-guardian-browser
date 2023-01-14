import Pagination from './Pagination';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import type { IPaginationProps } from './Pagination.types'

describe('components/pagination', () => {
	it('should render Pagination', () => {

        const mockCallback = jest.fn((value: number) => console.log(value));
    
        const props: IPaginationProps = {
                pagesAll: 11,
                pagesCurrent: 1,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

		const elementPrev = screen.getByText(/previous/i);
        const elementNext = screen.getByText(/next/i);
        const expectedStartValues = screen.getAllByText(/1/);

		expect(elementPrev).toBeInTheDocument();
        expect(elementNext).toBeInTheDocument();
        expect(expectedStartValues).toHaveLength(2);
	});

    it('should render Pagination with 6 buttons for 6 pages', () => {
        const mockCallback = jest.fn((value: number) => console.log(value));

        const props: IPaginationProps = {
                pagesAll: 6,
                pagesCurrent: 1,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

		const elementPrev = screen.getByText(/previous/i);
        const elementNext = screen.getByText(/next/i);
        const expectedStartValue = screen.getByText(/1/);
        const expectedEndValue = screen.getByText(/6/);


		expect(elementPrev).toBeInTheDocument();
        expect(elementNext).toBeInTheDocument();
        expect(expectedStartValue).toBeInTheDocument();
        expect(expectedEndValue).toBeInTheDocument();
	});

    it('should render Pagination with no more than 6 buttons for 6 pages', () => {
        const mockCallback = jest.fn((value: number) => console.log(value));

        const props: IPaginationProps = {
                pagesAll: 6,
                pagesCurrent: 1,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

		const elementPrev = screen.getByText(/previous/i);
        const elementNext = screen.getByText(/next/i);
        const expectedEndValue = screen.getByText(/6/);
        const unexpectedEndValue = screen.queryAllByText(/7/);

		expect(elementPrev).toBeInTheDocument();
        expect(elementNext).toBeInTheDocument();
        expect(expectedEndValue).toBeInTheDocument();
        expect(unexpectedEndValue).toHaveLength(0);
	});

    it('should render Pagination for pagesAll when pagesCurrent > pagesAll ', () => {
        const mockCallback = jest.fn((value: number) => value);
    
        const props: IPaginationProps = {
                pagesAll: 5,
                pagesCurrent: 11,
                onClick: mockCallback,
        }
    
        render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );
    
		const elementPrev = screen.getByText(/previous/i);
        const elementNext = screen.getByText(/next/i);
        const expectedStartValues = screen.getAllByText(/1/);

		expect(elementPrev).toBeInTheDocument();
        expect(elementNext).toBeInTheDocument();
        expect(expectedStartValues).toHaveLength(1);
    });



    it('should render Pagination and return "click" on "Previous" btn click event', () => {
        const mockCallback = jest.fn((value: number) => console.log(value));

        const props: IPaginationProps = {
                pagesAll: 6,
                pagesCurrent: 1,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

		const elementPrev = screen.getByText(/previous/i);
        const elementNext = screen.getByText(/next/i);
        const expectedEndValue = screen.getByText(/6/);
        const unexpectedEndValue = screen.queryAllByText(/7/);

		expect(elementPrev).toBeInTheDocument();
        expect(elementNext).toBeInTheDocument();
        expect(expectedEndValue).toBeInTheDocument();
        expect(unexpectedEndValue).toHaveLength(0);
	});

    it('should render Pagination and for current page "1" return "1" on "Previous" btn click event', () => {
        const mockCallback = jest.fn((value: number) => value);

        const props: IPaginationProps = {
                pagesAll: 11,
                pagesCurrent: 1,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

        fireEvent(screen.getByText(/previous/i), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toReturnWith(1);   
    });

// #########################################################
//     1. test click dla Previous:
//         1.1 wariant dla current: 1; all: 11 -> previous === 1
//         1.2 wariant dla current: 3; all: 11 -> previous === 2
//     2. test click dla Next
//         2.1 wariant dla current: 9; all: 11 -> next === 10
//         2.2 wariant dla current: 10; all: 11 -> next === 11
//         2.3 wariant dla current: 10; all: 10 -> next === 10 
//     3. test click dla dowolnego btn
// #########################################################
// #### START ####

    it('should render Pagination and for current page "3" return "2" on "Previous" btn click event', () => {
        const mockCallback = jest.fn((value: number) => value);

        const props: IPaginationProps = {
                pagesAll: 11,
                pagesCurrent: 3,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

        fireEvent(screen.getByText(/previous/i), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toReturnWith(2);   
    });

    it('should render Pagination and for current page "9" return "10" on "Next" btn click event', () => {
        const mockCallback = jest.fn((value: number) => value);

        const props: IPaginationProps = {
                pagesAll: 11,
                pagesCurrent: 9,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

        fireEvent(screen.getByText(/next/i), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));  

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toReturnWith(10);   
	});

    it('should render Pagination and for current page "10" return "11" on "Next" btn click event', () => {
        const mockCallback = jest.fn((value: number) => value);

        const props: IPaginationProps = {
                pagesAll: 11,
                pagesCurrent: 10,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

        fireEvent(screen.getByText(/next/i), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));  

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toReturnWith(11);   
	});

    it('should render Pagination and for current page "10" return "10" on "Next" btn click event', () => {
        const mockCallback = jest.fn((value: number) => value);
    
        const props: IPaginationProps = {
                pagesAll: 10,
                pagesCurrent: 10,
                onClick: mockCallback,
        }
    
        render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );
    
        fireEvent(screen.getByText(/next/i), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));  
    
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toReturnWith(10);   
    });

    it('should render Pagination and for current page "5" return "5" on "5" btn click event', () => {
        const mockCallback = jest.fn((value: number) => value);

        const props: IPaginationProps = {
                pagesAll: 11,
                pagesCurrent: 10,
                onClick: mockCallback,
        }

		render(
            <Pagination 
                pagesAll={props.pagesAll}
                pagesCurrent={props.pagesCurrent}
                onClick={props.onClick}
            />
        );

        fireEvent(screen.getByText(/5/i), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));  

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toReturnWith(5);   
	});


    
// #### END ####




});
