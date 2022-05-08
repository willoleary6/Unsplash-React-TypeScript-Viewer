import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("Footer render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const wrapper = shallow(<LoadingSpinner />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
