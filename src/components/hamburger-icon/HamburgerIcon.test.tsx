import HamburgerIcon from './HamburgerIcon';
import type { IHamburgerIconProps } from './HamburgerIcon.types';
import { render, screen } from '@testing-library/react';

describe(`HamburgerIcon`, () => {
	it(`should render component`, () => {
		const mockedIsCollapsed: IHamburgerIconProps = {
			isCollapsed: true,
		};

		render(<HamburgerIcon isCollapsed={mockedIsCollapsed.isCollapsed} />);

		expect(screen.getByRole('switch')).toBeInTheDocument();
	});
});