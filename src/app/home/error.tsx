'use client';

import ErrorState from '@/components/ErrorState/ErrorState';

const HomeError = ({ reset }: { error: Error; reset: () => void }) => {
    return (
        <ErrorState
            title="Failed to load characters"
            message="Could not connect to the Rick and Morty API. Please check your connection and try again."
            retry={reset}
        />
    );
};

export default HomeError;
