import React from "react";
import "./MapWidget.css";
import { coordinates } from "../../slices/GeoMap/GeoMapSlice";

interface coordinateProps {
    coordinates: coordinates;
    displayClassName: string;
}

export const CoordinateDisplay = ({
    coordinates,
    displayClassName: displayClassName,
}: coordinateProps): JSX.Element => {
    return (
        <>
            <div className={displayClassName}>
                <p className={"longitude-latitude-titlebox"}>Lat: {coordinates.lat}</p>
                <p className={"longitude-latitude-titlebox"}>Lng: {coordinates.lng}</p>
            </div>
        </>
    );
};
