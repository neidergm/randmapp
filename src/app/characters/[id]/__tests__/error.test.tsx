import { render, screen, fireEvent } from '@testing-library/react';
import DetailError from '../error';

describe('DetailError', () => {
    it('should render the correct error title', () => {
        render(<DetailError error={new Error('test')} reset={jest.fn()} />);
        expect(screen.getByText('Character not found')).toBeInTheDocument();
    });

    it('should render the correct error message', () => {
        render(<DetailError error={new Error('test')} reset={jest.fn()} />);
        expect(screen.getByText(/Could not load this character/)).toBeInTheDocument();
    });

    it('should call reset when Try again is clicked', () => {
        const reset = jest.fn();
        render(<DetailError error={new Error('test')} reset={reset} />);

        fireEvent.click(screen.getByText('Try again'));
        expect(reset).toHaveBeenCalledTimes(1);
    });
});
