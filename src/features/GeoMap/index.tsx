import React from "react";
import Card from "react-bootstrap/Card";
import { Map } from "../Map";

export const GeoMap = (): JSX.Element => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Geo Map</Card.Title>
                <Map />
            </Card.Body>
        </Card>
    );
};
