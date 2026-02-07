'use client';

import ErrorState from '@/components/ErrorState/ErrorState';

const DetailError = ({ reset }: { error: Error; reset: () => void }) => {
    return (
        <ErrorState
            title="Character not found"
            message="Could not load this character's details. The character may not exist or there was a connection issue."
            retry={reset}
        />
    );
};

export default DetailError;
