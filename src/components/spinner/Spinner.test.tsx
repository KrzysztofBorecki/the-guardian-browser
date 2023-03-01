import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe(`Spinner`, () => {
    it(`should render component with text`, () => {
        render(<Spinner text='test-spinner' />);

        expect(screen.getByText('test-spinner')).toBeInTheDocument();
    });

    it(`should render component with image`, () => {
        render(<Spinner text='test-spinner' />);

        expect(screen.getByAltText('spinner')).toBeInTheDocument();
    });
});