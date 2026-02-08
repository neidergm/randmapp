import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation');

describe('SearchBar', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        mockPush.mockClear();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
            back: jest.fn(),
            replace: jest.fn(),
            refresh: jest.fn(),
            prefetch: jest.fn(),
        });
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    });

    it('should render input with placeholder "Search characters..."', () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument();
    });

    it('should render input with aria-label "Search Characters"', () => {
        render(<SearchBar />);
        expect(screen.getByLabelText('Search Characters')).toBeInTheDocument();
    });

    it('should update input value on change', () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText('Search characters...') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'Rick' } });
        expect(input.value).toBe('Rick');
    });

    it('should initialize with current search param value', () => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('name=Morty'));

        render(<SearchBar />);
        const input = screen.getByPlaceholderText('Search characters...') as HTMLInputElement;
        expect(input.value).toBe('Morty');
    });
});
