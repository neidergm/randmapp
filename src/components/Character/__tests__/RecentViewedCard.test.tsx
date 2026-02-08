import { render, screen } from '@testing-library/react';
import RecentViewedCard from '../RecentViewedCard';
import { VisitedCharacter } from '@/types/character.types';

const mockChar: VisitedCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
};

describe('RecentViewedCard', () => {
    it('should render character name', () => {
        render(<RecentViewedCard char={mockChar} />);
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('should render "See again" text', () => {
        render(<RecentViewedCard char={mockChar} />);
        expect(screen.getByText('See again')).toBeInTheDocument();
    });

    it('should link to character detail page', () => {
        render(<RecentViewedCard char={mockChar} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/characters/1');
    });

    it('should render character image with correct alt', () => {
        render(<RecentViewedCard char={mockChar} />);
        const img = screen.getByAltText('Rick Sanchez');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockChar.image);
    });
});
