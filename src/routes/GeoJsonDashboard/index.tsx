import React from "react";
import { GeoMap } from "../../features/GeoMap";
export function GeoJsonDashboard(): JSX.Element {
    return (
        <>
            {/* Wrap it in a dummy jsx parent */}
            <div className="row">
                <div className="col-lg-4 mt-5"></div>
                <div className="col-lg-4 mt-5">
                    <GeoMap />
                </div>
                <div className="col-lg-4 mt-5"></div>
            </div>
        </>
    );
}
