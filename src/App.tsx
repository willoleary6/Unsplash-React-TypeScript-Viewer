import React from "react";
import { Switch, Route } from "react-router-dom";

import { SideNavbar } from "./features/SideNavbar";
import { TopNavbar } from "./features/TopNavbar";
import { routes } from "./routes/routes";
import { Footer } from "./features/Footer";
function App(): JSX.Element {
    const renderRoutes: JSX.Element[] = [];
    routes.forEach((route) => {
        renderRoutes.push(
            <Route exact key={route.id} path={route.path}>
                {route.component ? <route.component /> : <></>}
            </Route>
        );
    });
    return (
        <React.Fragment>
            <div id="wrapper">
                <TopNavbar></TopNavbar>
                <SideNavbar routes={routes}></SideNavbar>
                <div id="page-wrapper" className="gray-bg">
                    <Switch>{renderRoutes}</Switch>
                    <Footer></Footer>
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
