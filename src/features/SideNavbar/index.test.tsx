import React from "react";
import { SideNavbar } from ".";
import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { routes } from "../../routes/routes";
Enzyme.configure({ adapter: new Adapter() });

describe("SideNavbar render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const wrapper = shallow(<SideNavbar routes={routes} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
