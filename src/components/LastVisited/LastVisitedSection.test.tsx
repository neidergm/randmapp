import { render, screen, fireEvent } from '@testing-library/react';
import LastVisitedSection from './LastVisitedSection';
import { VisitedCharacter } from '@/types/character.types';

const mockClearVisited = jest.fn();
let mockVisited: VisitedCharacter[] | null = null;

jest.mock('@/hooks/useLastVisited', () => ({
    useLastVisited: () => ({
        visited: mockVisited,
        addVisited: jest.fn(),
        clearVisited: mockClearVisited,
    }),
}));

describe('LastVisitedSection', () => {
    beforeEach(() => {
        mockClearVisited.mockClear();
        mockVisited = null;
    });

    it('should show spinner when visited is null (loading)', () => {
        mockVisited = null;
        render(<LastVisitedSection />);

        // Spinner renders LuLoader icon - check container exists
        const container = document.querySelector('[class*="spinnerContainer"]');
        expect(container).toBeInTheDocument();
    });

    it('should show empty message when visited array is empty', () => {
        mockVisited = [];
        render(<LastVisitedSection />);

        expect(screen.getByText(/You have not viewed any characters yet/)).toBeInTheDocument();
    });

    it('should render list of visited characters', () => {
        mockVisited = [
            { id: 1, name: 'Rick Sanchez', image: 'https://example.com/1.jpg', status: 'Alive' },
            { id: 2, name: 'Morty Smith', image: 'https://example.com/2.jpg', status: 'Alive' },
        ];
        render(<LastVisitedSection />);

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    it('should render "RECENTLY VIEWED" title', () => {
        mockVisited = [];
        render(<LastVisitedSection />);

        expect(screen.getByText('RECENTLY VIEWED')).toBeInTheDocument();
    });

    it('should call clearVisited when Clear button is clicked', () => {
        mockVisited = [
            { id: 1, name: 'Rick', image: 'https://example.com/1.jpg', status: 'Alive' },
        ];
        render(<LastVisitedSection />);

        fireEvent.click(screen.getByText('Clear'));
        expect(mockClearVisited).toHaveBeenCalledTimes(1);
    });
});
