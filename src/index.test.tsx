import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.appendChild(div);
        require("./index.tsx");
        expect(ReactDOM.render).toHaveBeenCalledWith(
            <React.StrictMode>
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
            </React.StrictMode>,
            div
        );
    });
});
