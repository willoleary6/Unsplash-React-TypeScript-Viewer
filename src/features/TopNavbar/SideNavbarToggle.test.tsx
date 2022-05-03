import React from "react";
import { SideNavbarToggle } from "./SideNavbarToggle";
import Enzyme, { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

describe("SideNavbarToggle render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = shallow(<SideNavbarToggle />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe("SideNavbarToggle functionality testing", () => {
    it("checks that the toggle function is working correctly", () => {
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = shallow(<SideNavbarToggle />);
        wrapper.simulate("click");
        expect(wrapper.hasClass("mini-navbar")).toBe(false);
    });
});
