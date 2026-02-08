import { render, screen, fireEvent } from '@testing-library/react';
import ErrorState from './ErrorState';

const title = 'Ups! No results found';
const message = 'Please try again later.';

describe(ErrorState, () => {
    it('Render only title and message', () => {
        render(<ErrorState title={title} message={message} />);

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();

        const actionButton = screen.queryByRole('link', { name: 'Go to home' });
        expect(actionButton).not.toBeInTheDocument();

        const retryButton = screen.queryByRole('button', { name: 'Try again' });
        expect(retryButton).not.toBeInTheDocument();
    });

    it('Render with only action link and custom label', () => {
        render(<ErrorState
            title={title}
            message={message}
            actionHref="/home"
            actionLabel="Go to home"
        />);

        const actionButton = screen.getByRole('link', { name: /go to home/i });
        expect(actionButton).toBeInTheDocument();
        expect(actionButton).toHaveAttribute('href', '/home');
    })

    it('Render with retry button', () => {
        const mockRetry = jest.fn();

        render(<ErrorState
            title={title}
            message={message}
            retry={mockRetry}
        />);

        const retryButton = screen.getByRole('button', { name: 'Try again' });
        expect(retryButton).toBeInTheDocument();
        
        fireEvent.click(retryButton);
        expect(mockRetry).toHaveBeenCalledTimes(1);
    })
});

