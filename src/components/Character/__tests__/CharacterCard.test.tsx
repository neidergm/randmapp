import { render, screen } from '@testing-library/react';
import CharacterCard from '../CharacterCard';
import { Character } from '@/types/character.types';

const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterCard', () => {
    it('should render character name', () => {
        render(<CharacterCard data={mockCharacter} />);
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('should render character species', () => {
        render(<CharacterCard data={mockCharacter} />);
        expect(screen.getByText('Human')).toBeInTheDocument();
    });

    it('should render character location name', () => {
        render(<CharacterCard data={mockCharacter} />);
        expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    });

    it('should render character status', () => {
        render(<CharacterCard data={mockCharacter} />);
        expect(screen.getByText('Alive')).toBeInTheDocument();
    });

    it('should link to character detail page', () => {
        render(<CharacterCard data={mockCharacter} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/characters/1');
    });

    it('should render character image with correct alt text', () => {
        render(<CharacterCard data={mockCharacter} />);
        const img = screen.getByAltText('Rick Sanchez');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockCharacter.image);
    });
});
