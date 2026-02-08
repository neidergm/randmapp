import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation');

describe('Pagination', () => {
    beforeEach(() => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    });

    it('should render Previous and Next buttons', () => {
        render(<Pagination totalPages={5} currentPage={3} />);

        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should disable Previous button on first page', () => {
        render(<Pagination totalPages={5} currentPage={1} />);

        const prevLink = screen.getByText('Previous');
        expect(prevLink.className).toContain('disabled');
    });

    it('should disable Next button on last page', () => {
        render(<Pagination totalPages={5} currentPage={5} />);

        const nextLink = screen.getByText('Next');
        expect(nextLink.className).toContain('disabled');
    });

    it('should not disable Previous or Next on middle page', () => {
        render(<Pagination totalPages={5} currentPage={3} />);

        expect(screen.getByText('Previous').className).not.toContain('disabled');
        expect(screen.getByText('Next').className).not.toContain('disabled');
    });

    it('should render page number links', () => {
        render(<Pagination totalPages={3} currentPage={1} />);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should highlight current page', () => {
        render(<Pagination totalPages={3} currentPage={2} />);

        const currentPageLink = screen.getByText('2');
        expect(currentPageLink.className).toContain('active');
    });

    it('should render ellipsis for many pages', () => {
        render(<Pagination totalPages={20} currentPage={10} />);

        const ellipses = screen.getAllByText('...');
        expect(ellipses.length).toBeGreaterThanOrEqual(1);
    });

    it('should build correct href for page links', () => {
        render(<Pagination totalPages={3} currentPage={1} />);

        const page2Link = screen.getByText('2');
        expect(page2Link).toHaveAttribute('href', '?page=2');
    });
});
