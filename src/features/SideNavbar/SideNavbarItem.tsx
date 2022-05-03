import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Route } from "../../routes/routes";

interface SideNavbarItemProps {
    route: Route;
}

export const SideNavbarItem = ({ route }: SideNavbarItemProps): JSX.Element => {
    const match = useRouteMatch({
        path: route.path,
        exact: true,
    });

    return (
        <li className={match ? "active" : ""}>
            <Link to={route.path}>
                <>
                    {route.icon} <span className="nav-label">{route.label}</span>
                </>
            </Link>
        </li>
    );
};
