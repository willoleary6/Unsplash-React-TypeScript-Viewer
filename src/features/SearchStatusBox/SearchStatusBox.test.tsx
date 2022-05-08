import React from "react";
import { SearchStatusBox } from "./SearchStatusBox";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("SearchStatusBox render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const wrapper = shallow(<SearchStatusBox messageToDisplay="test" isError={false} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders component in error mode and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const wrapper = shallow(<SearchStatusBox messageToDisplay="test" isError={true} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
