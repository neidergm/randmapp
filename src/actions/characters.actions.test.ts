jest.mock('next/cache', () => ({
    revalidateTag: jest.fn(),
}));

import { loadCharacters, getCharacterDetail, revalidateCharacters } from './characters.actions';
import { revalidateTag } from 'next/cache';

describe('characters actions', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('loadCharacters', () => {
        it('should return characters data on success', async () => {
            const mockResponse = {
                info: { count: 1, pages: 1, next: null, prev: null },
                results: [{ id: 1, name: 'Rick Sanchez' }],
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse),
            });

            const result = await loadCharacters({ page: 1 });

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('character/?page=1'),
                expect.any(Object)
            );
        });

        it('should return null on 404', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 404,
            });

            const result = await loadCharacters({ page: 1, name: 'nonexistent' });

            expect(result).toBeNull();
        });

        it('should throw error on server error (500)', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 500,
            });

            await expect(loadCharacters({ page: 1 })).rejects.toThrow('Failed to load characters');
        });

        it('should include name parameter in URL when provided', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ info: {}, results: [] }),
            });

            await loadCharacters({ page: 2, name: 'Morty' });

            const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
            expect(calledUrl).toContain('page=2');
            expect(calledUrl).toContain('name=Morty');
        });
    });

    describe('getCharacterDetail', () => {
        it('should return character data on success', async () => {
            const mockCharacter = { id: 1, name: 'Rick Sanchez', status: 'Alive' };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockCharacter),
            });

            const result = await getCharacterDetail('1');

            expect(result).toEqual(mockCharacter);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('character/1'),
                expect.any(Object)
            );
        });

        it('should throw error when response is not ok', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 404,
            });

            await expect(getCharacterDetail('999')).rejects.toThrow('Failed to load character details');
        });
    });

    describe('revalidateCharacters', () => {
        it('should call revalidateTag for characters and character-detail', async () => {
            await revalidateCharacters();

            expect(revalidateTag).toHaveBeenCalledWith('characters', expect.anything());
            expect(revalidateTag).toHaveBeenCalledWith('character-detail', expect.anything());
        });
    });
});
