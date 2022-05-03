import React from "react";
import { SideNavbarItem } from "./SideNavbarItem";
import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { routes } from "../../routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
Enzyme.configure({ adapter: new Adapter() });

describe("SideNavbarItem render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = mount(
            <Router>
                <SideNavbarItem route={routes[0]} />
            </Router>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
