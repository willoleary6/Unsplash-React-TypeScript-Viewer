import { LatLngBounds } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, useMapEvents, useMap, GeoJSON } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    disableReduxInducedMapMovements,
    enableReduxInducedMapMovements,
    fetchOpenStreetData,
    selectGeoMap,
    updateCentreCoordinates,
    updateNorthEastCoordinates,
    updateNorthWestCoordinates,
    updateSouthEastCoordinates,
    updateSouthWestCoordinates,
} from "../../slices/GeoMap/GeoMapSlice";
import { CoordinateDisplay } from "./CoordinateDisplay";
import { CoordinateInput } from "./CoordinateInput";
import "./MapWidget.css";

export const Map = (): JSX.Element => {
    const geoMapSlice = useAppSelector(selectGeoMap);
    const dispatch = useAppDispatch();

    const updateCornerCoordinates = (bounds: LatLngBounds) => {
        // function thats in charge of updating the bounds of the map in the store
        const northEastCoordinates = bounds.getNorthEast();
        const southWestCoordinates = bounds.getSouthWest();
        const northWestCoordinates = bounds.getNorthWest();
        const southEastCoordinates = bounds.getSouthEast();
        // reducers in the slice will catch these dispatches and update the store
        dispatch(
            updateNorthWestCoordinates({
                lat: northWestCoordinates.lat,
                lng: northWestCoordinates.lng,
            })
        );
        dispatch(
            updateNorthEastCoordinates({
                lat: northEastCoordinates.lat,
                lng: northEastCoordinates.lng,
            })
        );
        dispatch(
            updateSouthWestCoordinates({
                lat: southWestCoordinates.lat,
                lng: southWestCoordinates.lng,
            })
        );
        dispatch(
            updateSouthEastCoordinates({
                lat: southEastCoordinates.lat,
                lng: southEastCoordinates.lng,
            })
        );
    };

    // aynchronous function to update the map once valid coordinates
    const searchForCoordinates = async (latitude: number, longitude: number) => {
        // Awaits are needed here to ensure that the dispatch action trigger correctly,
        // this does trigger a react warning but there is no other way for this process to work
        // unless the slice exclusively uses thunks instead of dispatching to regular reducers
        await dispatch(enableReduxInducedMapMovements());
        await dispatch(
            updateCentreCoordinates({
                lat: latitude,
                lng: longitude,
            })
        );
        await dispatch(disableReduxInducedMapMovements());
        await dispatch(fetchOpenStreetData());
    };

    const MapEventHandlers = () => {
        useMapEvents({
            dragend() {
                dispatch(enableReduxInducedMapMovements());
                dispatch(fetchOpenStreetData());
            },
            dragstart() {
                // we want to disable any redux updates while moving around
                dispatch(disableReduxInducedMapMovements());
            },
            zoomend() {
                dispatch(fetchOpenStreetData());
            },

            move(moveEvent) {
                dispatch(
                    updateCentreCoordinates({
                        lat: moveEvent.target.getCenter().lat,
                        lng: moveEvent.target.getCenter().lng,
                    })
                );
                updateCornerCoordinates(moveEvent.target.getBounds());
            },
        });
        return null;
    };
    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                crossOrigin=""
            />
            <script
                src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                crossOrigin=""
            ></script>
            <div className="map-element-row">
                <CoordinateInput searchForCoordinates={searchForCoordinates} />
            </div>
            <div className="map-element-row">
                <CoordinateDisplay
                    coordinates={geoMapSlice.northWestCoordinates}
                    displayClassName="latitude-value-container"
                />
                <CoordinateDisplay
                    coordinates={geoMapSlice.northEastCoordinates}
                    displayClassName="longitude-value-container"
                />
            </div>
            <div id="map">
                <div id="crosshair">(+)</div>
                <MapContainer
                    center={[geoMapSlice.centreCoordinates.lat, geoMapSlice.centreCoordinates.lng]}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="leaflet-map-container"
                    whenCreated={(map) => {
                        // on load actions
                        updateCornerCoordinates(map.getBounds());
                        dispatch(fetchOpenStreetData());
                    }}
                >
                    <MapEventHandlers />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RenderGeoJsonData />
                    <ChangeMapView
                        latitude={geoMapSlice.centreCoordinates.lat}
                        longitude={geoMapSlice.centreCoordinates.lng}
                    />
                </MapContainer>
            </div>
            <div className="map-element-row">
                <CoordinateDisplay
                    coordinates={geoMapSlice.southWestCoordinates}
                    displayClassName="latitude-value-container"
                />
                <CoordinateDisplay
                    coordinates={geoMapSlice.southEastCoordinates}
                    displayClassName="longitude-value-container"
                />
            </div>
        </>
    );
};

interface coordinateProps {
    latitude: number;
    longitude: number;
}
/*
React does not allow for components to trigger a render of a parent 
component if the code is stored within the parent itself, better to store it outside 
*/
const ChangeMapView = ({ latitude, longitude }: coordinateProps): JSX.Element => {
    const geoMapSlice = useAppSelector(selectGeoMap);
    const map = useMap();
    const mapCentre = map.getCenter();

    if (
        (mapCentre.lat != geoMapSlice.centreCoordinates.lat ||
            mapCentre.lng != geoMapSlice.centreCoordinates.lng) &&
        geoMapSlice.canInduceMapMovements
    ) {
        map.panTo([latitude, longitude]);
    }
    return <></>;
};

const RenderGeoJsonData = (): JSX.Element => {
    const geoMapSlice = useAppSelector(selectGeoMap);
    if (geoMapSlice.geoJsonData != null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return geoMapSlice.geoJsonData.map((element: any, index: number) => {
            return <GeoJSON key={element + index} data={element} />;
        });
    }
    return <></>;
};
