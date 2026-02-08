import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from '../BackButton';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');

describe('BackButton', () => {
    it('should render "Back to Character List" text', () => {
        render(<BackButton />);
        expect(screen.getByText(/Back to Character List/)).toBeInTheDocument();
    });

    it('should call router.back() on click', () => {
        const mockBack = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            back: mockBack,
            push: jest.fn(),
            replace: jest.fn(),
            refresh: jest.fn(),
            prefetch: jest.fn(),
        });

        render(<BackButton />);
        fireEvent.click(screen.getByRole('button'));

        expect(mockBack).toHaveBeenCalledTimes(1);
    });

    it('should apply custom className', () => {
        render(<BackButton className="custom-class" />);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
});
