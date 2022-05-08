import React from "react";
import { SearchBar } from "./SearchBar";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("SearchBar render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const testFunction = (testString: string) => testString + "";
        const wrapper = shallow(<SearchBar executeSearchFunction={testFunction} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
