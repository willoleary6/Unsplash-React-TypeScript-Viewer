// Import CSS files first so that component level CSS files can overwrite them
import "bootstrap/dist/css/bootstrap.css";
import "fontawesome-4.7/css/font-awesome.css";
import "animate.css/animate.css";
import "./inspinia/style/inspinia.css";
import "./style/additionalStyles.css";
import "./index.css";
import "flowbite";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
