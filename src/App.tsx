import React from "react";
import { Switch, Route } from "react-router-dom";

import { routes } from "./routes/routes";
import { Footer } from "./features/Footer";
function App(): JSX.Element {
    const renderRoutes: JSX.Element[] = [];
    routes.forEach((route) => {
        renderRoutes.push(
            <Route exact key={route.id} path={route.path}>
                <route.component />
            </Route>
        );
    });
    return (
        <React.Fragment>
            <div className=" overflow-x-hidden">
                <div>
                    <div className="flex flex-col bg-neutral-100">
                        <div className="min-h-screen">
                            <Switch>{renderRoutes}</Switch>
                        </div>
                        <div>
                            <Footer></Footer>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
