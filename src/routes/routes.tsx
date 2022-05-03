import React from "react";
import { GeoJsonDashboard } from "./GeoJsonDashboard";
import { UnsplashViewerDashboard } from "./UnsplashViewerDashboard";
/**
 * Route information
 *
 * Top level routes should always contain an icon and either a component or
 * subroutes. Second level routes should not contain an icon or subroutes but
 * should contain a component.
 */
export interface Route {
    id: string;
    path: string;
    label: string;
    icon?: JSX.Element;
    component?: React.FC;
    subroutes?: Route[];
}

export const routes: Route[] = [
    // Top level route with no subroutes
    {
        id: "GeoJsonRoute",
        path: "/",
        label: "GeoJSON",
        icon: <i className="fa fa-globe"></i>,
        component: GeoJsonDashboard,
    },
    {
        id: "UnsplashViewerDashboard",
        path: "/UnspashViewer",
        label: "Unsplash Viewer",
        icon: <i className="fa fa-picture-o"></i>,
        component: UnsplashViewerDashboard,
    },
];
