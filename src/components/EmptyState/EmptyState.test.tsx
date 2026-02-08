import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe(EmptyState, () => {
    it('Render only title and message', () => {
        render(<EmptyState
            title="No results found"
            message="Please try again later."
        />);

        expect(screen.getByText('No results found')).toBeInTheDocument();
        expect(screen.getByText('Please try again later.')).toBeInTheDocument();

        const actionButton = screen.queryByRole('link', { name: 'Go to home' });
        expect(actionButton).not.toBeInTheDocument();
    });

    it('Render with action button', () => {
        render(<EmptyState
            title="No results found"
            message="Please try again later."
            actionHref="/home"
        />);

        const actionButton = screen.getByRole('link', { name: 'Go to home' });
        expect(actionButton).toBeInTheDocument();
        expect(actionButton).toHaveAttribute('href', '/home');
    })

    it('Render with custom action label', () => {
        render(<EmptyState
            title="No results found"
            message="Please try again later."
            actionHref="/home"
            actionLabel="Back to home"
        />);

        const actionButton = screen.getByRole('link', { name: 'Back to home' });
        expect(actionButton).toBeInTheDocument();
        expect(actionButton).toHaveAttribute('href', '/home');
    })
});

