import { render, screen } from '@testing-library/react';
import MainFooter from './MainFooter';

describe('MainFooter', () => {
    it('should render author name', () => {
        render(<MainFooter />);
        expect(screen.getByText(/NeiderG/)).toBeInTheDocument();
    });

    it('should render current year in copyright', () => {
        render(<MainFooter />);
        const year = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    });

    it('should render "Rick and Morty App" text', () => {
        render(<MainFooter />);
        expect(screen.getByText(/Rick and Morty App/)).toBeInTheDocument();
    });
});
