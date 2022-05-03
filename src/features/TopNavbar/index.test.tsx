import React from "react";
import { TopNavbar } from ".";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("TopNavbar render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const wrapper = shallow(<TopNavbar />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
