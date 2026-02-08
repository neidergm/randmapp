import { render, screen, fireEvent } from '@testing-library/react';
import HomeError from '../error';

describe('HomeError', () => {
    it('should render the correct error title', () => {
        render(<HomeError error={new Error('test')} reset={jest.fn()} />);
        expect(screen.getByText('Failed to load characters')).toBeInTheDocument();
    });

    it('should render the correct error message', () => {
        render(<HomeError error={new Error('test')} reset={jest.fn()} />);
        expect(screen.getByText(/Could not connect to the Rick and Morty API/)).toBeInTheDocument();
    });

    it('should call reset when Try again is clicked', () => {
        const reset = jest.fn();
        render(<HomeError error={new Error('test')} reset={reset} />);

        fireEvent.click(screen.getByText('Try again'));
        expect(reset).toHaveBeenCalledTimes(1);
    });
});
