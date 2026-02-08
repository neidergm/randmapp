'use client';
import { useEffect } from 'react';
import { useLastVisited } from '@/hooks/useLastVisited';
import { VisitedCharacter } from '@/types/character.types';

type VisitedTrackerProps = VisitedCharacter;

/**
 * Component that tracks the last visited character by adding it to the visited list on mount.
 * It does not render anything itself, it just performs the side effect of tracking.
 */

export default function VisitedTracker({ id, name, image, status }: VisitedTrackerProps) {
    const { addVisited } = useLastVisited();

    useEffect(() => {
        addVisited({ id, name, image, status });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}