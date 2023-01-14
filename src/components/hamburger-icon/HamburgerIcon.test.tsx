import HamburgerIcon from './HamburgerIcon';
import type { IHamburgerIconProps } from './HamburgerIcon.types';
import { render, screen } from '@testing-library/react';

describe('components/hamburger-icon', () => {
	it('should render Hamburger icon', () => {
		const mockIsCollapsed: IHamburgerIconProps = {
			isCollapsed: true,
		};

		render(<HamburgerIcon isCollapsed={mockIsCollapsed.isCollapsed} />);

		const element = screen.getByRole('switch');

		expect(element).toBeInTheDocument();
	});
});
