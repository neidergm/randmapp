'use client';

import { useFetch } from "@/hooks/useFetch";
import { CharLocation, FetchLocationResult } from "@/types/location.types";
import Spinner from "../Spinner/Spinner";
import { LuTriangleAlert } from "react-icons/lu";

const CharacterLocation = ({ location }: { location: CharLocation }) => {

    const { data, loading, error } = useFetch<FetchLocationResult>(location.url);

    if (loading) return <Spinner size={20}>Loading data...</Spinner>;

    if (error) return <div className="d-flex alig-center" >
        <LuTriangleAlert size={16} className="text-danger"/> &nbsp; Error loading data
    </div>;

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