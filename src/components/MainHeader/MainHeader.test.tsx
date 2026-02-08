import { render, screen } from '@testing-library/react';
import MainHeader from './MainHeader';

describe('MainHeader', () => {
    it('should render brand name "RICK & MORTY"', () => {
        render(<MainHeader />);
        expect(screen.getByText('RICK & MORTY')).toBeInTheDocument();
    });

    it('should render subtitle "Explorer"', () => {
        render(<MainHeader />);
        expect(screen.getByText('Explorer')).toBeInTheDocument();
    });
});
