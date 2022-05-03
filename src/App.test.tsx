import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

describe("Application root", () => {
    it("should have the app name in the documant", () => {
        const { getByText } = render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        expect(getByText(/GeoJSON Features/i)).toBeInTheDocument();
    });
});
