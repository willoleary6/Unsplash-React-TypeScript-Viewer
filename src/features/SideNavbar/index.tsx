import React from "react";
import { Route } from "../../routes/routes";

import { SideNavbarItem } from "./SideNavbarItem";

import "./SideNavbar.css";

interface SideNavbarProps {
    routes: Route[];
}

export const SideNavbar = ({ routes }: SideNavbarProps): JSX.Element => {
    return (
        <nav className=" bg-slate-600 " role="navigation">
            <div>
                <ul>
                    {routes.map((route) => {
                        return <SideNavbarItem key={route.id} route={route}></SideNavbarItem>;
                    })}
                </ul>
            </div>
        </nav>
    );
};
