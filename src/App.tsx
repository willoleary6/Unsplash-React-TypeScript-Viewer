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
            <div className="grid grid-cols-12 gap-4 min-h-screen">
                <div className="col-span-12">
                    <div className="flex flex-col justify-between h-full bg-neutral-100">
                        <div>
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
