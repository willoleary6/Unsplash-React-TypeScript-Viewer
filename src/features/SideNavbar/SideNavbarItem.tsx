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
                <div className="flex flex-col">
                    <div className="px-6 py-2.5">{route.icon}</div>
                    <span className="nav-label">{route.label}</span>
                </div>
            </Link>
        </li>
    );
};
