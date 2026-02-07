'use client';

import { useFetch } from "@/hooks/useFetch";
import { CharLocation, FetchLocationResult } from "@/types/location.types";

const CharacterLocation = ({ location }: { location: CharLocation }) => {

    const { data, loading, error } = useFetch<FetchLocationResult>(location.url);

    if (loading) return <div>Loading data...</div>;

    if (error) return <div>Error loading data</div>;

    if (!data) return <div>No location data available</div>;

    return (
        <>
            <span>Dimension: {data.dimension}</span>
            <br />
            <span>Type: {data.type}</span>
        </>
    )
}

export default CharacterLocation