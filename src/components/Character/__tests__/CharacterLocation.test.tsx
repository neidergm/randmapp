import { render, screen } from '@testing-library/react';
import CharacterLocation from '../CharacterLocation';

const mockUseFetch = jest.fn();
jest.mock('@/hooks/useFetch', () => ({
    useFetch: (...args: unknown[]) => mockUseFetch(...args),
}));

describe('CharacterLocation', () => {
    beforeEach(() => {
        mockUseFetch.mockReset();
    });

    it('should return null when location URL is empty', () => {
        mockUseFetch.mockReturnValue({ data: null, loading: false, error: null });

        const { container } = render(
            <CharacterLocation location={{ name: 'Earth', url: '' }} />
        );

        expect(container.innerHTML).toBe('');
    });

    it('should show spinner when loading', () => {
        mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });

        render(
            <CharacterLocation location={{ name: 'Earth', url: 'https://api.example.com/location/1' }} />
        );

        expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });

    it('should show error message on fetch error', () => {
        mockUseFetch.mockReturnValue({ data: null, loading: false, error: new Error('fail') });

        render(
            <CharacterLocation location={{ name: 'Earth', url: 'https://api.example.com/location/1' }} />
        );

        expect(screen.getByText('Error loading data')).toBeInTheDocument();
    });

    it('should render dimension and type on success', () => {
        mockUseFetch.mockReturnValue({
            data: { dimension: 'Dimension C-137', type: 'Planet' },
            loading: false,
            error: null,
        });

        render(
            <CharacterLocation location={{ name: 'Earth', url: 'https://api.example.com/location/1' }} />
        );

        expect(screen.getByText('Dimension: Dimension C-137')).toBeInTheDocument();
        expect(screen.getByText('Type: Planet')).toBeInTheDocument();
    });

    it('should return null when data is null and not loading or erroring', () => {
        mockUseFetch.mockReturnValue({ data: null, loading: false, error: null });

        const { container } = render(
            <CharacterLocation location={{ name: 'Earth', url: 'https://api.example.com/location/1' }} />
        );

        expect(container.innerHTML).toBe('');
    });
});
