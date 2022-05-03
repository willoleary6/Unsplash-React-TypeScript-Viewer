import React from "react";
import { Route } from "../../routes/routes";

import { SideNavbarItem } from "./SideNavbarItem";

import "./SideNavbar.css";

interface SideNavbarProps {
    routes: Route[];
}

export const SideNavbar = ({ routes }: SideNavbarProps): JSX.Element => {
    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    {routes.map((route) => {
                        return <SideNavbarItem key={route.id} route={route}></SideNavbarItem>;
                    })}
                </ul>
            </div>
        </nav>
    );
};
