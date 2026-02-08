import { render } from '@testing-library/react';
import VisitedTracker from '../VisitedTracker';

const mockAddVisited = jest.fn();
jest.mock('@/hooks/useLastVisited', () => ({
    useLastVisited: () => ({
        visited: [],
        addVisited: mockAddVisited,
        clearVisited: jest.fn(),
    }),
}));

describe('VisitedTracker', () => {
    beforeEach(() => {
        mockAddVisited.mockClear();
    });

    it('should call addVisited on mount with correct props', () => {
        render(
            <VisitedTracker id={1} name="Rick" image="https://example.com/rick.jpg" status="Alive" />
        );

        expect(mockAddVisited).toHaveBeenCalledTimes(1);
        expect(mockAddVisited).toHaveBeenCalledWith({
            id: 1,
            name: 'Rick',
            image: 'https://example.com/rick.jpg',
            status: 'Alive',
        });
    });
    
});
