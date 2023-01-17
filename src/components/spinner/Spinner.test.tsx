import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('components/spinner', () => {
    it('should render Spinner component with text and svg', async () => {
        render(<Spinner text='test-spinner' />);

        const spinnerText = screen.getByText('test-spinner');
        const spinnerSvg = screen.getByAltText('spinner');

        expect(spinnerText).toBeInTheDocument();
        expect(spinnerSvg).toBeInTheDocument();
    });
});