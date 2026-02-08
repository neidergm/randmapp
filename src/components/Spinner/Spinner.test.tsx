import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
    it('should render without children', () => {
        const { container } = render(<Spinner />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with children text', () => {
        render(<Spinner>Loading...</Spinner>);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should apply additional className', () => {
        const { container } = render(<Spinner className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
