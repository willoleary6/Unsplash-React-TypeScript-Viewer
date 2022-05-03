import React, { useEffect, useState, KeyboardEvent } from "react";
import "./MapWidget.css";

interface CoordinateInputProps {
    searchForCoordinates: (latitude: number, longitude: number) => void;
}

export const CoordinateInput = ({ searchForCoordinates }: CoordinateInputProps): JSX.Element => {
    const [gpsInput, setGpsInput] = useState("");
    const [isValidInput, setValidInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        validateInput(gpsInput);
    }, [gpsInput]);

    const validateCoordinateNumber = (coordinate: number): boolean => {
        if (coordinate >= -90 && coordinate <= 90) {
            return true;
        }
        return false;
    };

    const enterKeyPressed = (e: KeyboardEvent): void => {
        if (e.key === "Enter" && isValidInput) {
            searchForCoordinates(latitude, longitude);
        }
    };

    const validateInput = (input: string) => {
        // first lets check what we have a latitude and longitude value
        // deliminated by a comma
        if (input.indexOf(",") > -1) {
            const splitInput = input.split(",");
            if (splitInput.length == 2) {
                // right format, now lets check if each coordinate is a number
                // latitude first
                const latitude = splitInput[0];
                if (Number(latitude) || latitude == "0") {
                    const numericLatitude = Number(latitude);
                    if (validateCoordinateNumber(numericLatitude)) {
                        setValidInput(true);
                        setLatitude(numericLatitude);
                        setErrorMessage("");
                    } else {
                        setValidInput(false);
                        setErrorMessage("Latitude is out of range");
                    }
                } else {
                    setValidInput(false);
                    setErrorMessage("Latitude input must be a number");
                    return;
                }
                // longitude next
                const longitude = splitInput[1];
                if (Number(longitude) || longitude == "0") {
                    const numericLongitude = Number(longitude);
                    if (validateCoordinateNumber(numericLongitude)) {
                        setValidInput(true);
                        setLongitude(numericLongitude);
                        setErrorMessage("");
                    } else {
                        setValidInput(false);
                        setErrorMessage("Longitude is out of range");
                    }
                } else {
                    setValidInput(false);
                    setErrorMessage("longitude input must be a number");
                    return;
                }
            } else {
                setValidInput(false);
                setErrorMessage("Only one comma is permitted");
            }
        } else if (input.length == 0) {
            // empty input, no need for an error message but also block the user
            setValidInput(false);
            setErrorMessage("");
        } else {
            // no comma present, tell user to add one in
            setValidInput(false);
            setErrorMessage("Missing comma delimator between numbers");
        }
    };

    const displayErrorMessageIfNeeded = () => {
        if (!isValidInput) {
            return <p className="error-message">{errorMessage}</p>;
        } else {
            return <></>;
        }
    };

    return (
        <>
            <div className={"coordinate-input-container"}>
                <div className="coordinate-input-controls"></div>
                <div className="coordinate-input-controls">
                    <input
                        onKeyUp={enterKeyPressed}
                        onChange={(event) => setGpsInput(event.target.value)}
                    />
                    <button
                        disabled={!isValidInput}
                        onClick={() => searchForCoordinates(latitude, longitude)}
                    >
                        🔍
                    </button>
                </div>
                <div className="coordinate-input-controls"></div>
                {displayErrorMessageIfNeeded()}
            </div>
        </>
    );
};
