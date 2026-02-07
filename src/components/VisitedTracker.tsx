'use client';
import { useEffect } from 'react';
import { useLastVisited } from '@/hooks/useLastVisited';
import { VisitedCharacter } from '@/types/character.types';

type VisitedTrackerProps = VisitedCharacter;

export default function VisitedTracker({ id, name, image, status }: VisitedTrackerProps) {
    const { addVisited } = useLastVisited();

    useEffect(() => {
        addVisited({ id, name, image, status });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}