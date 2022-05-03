import React from "react";
import { CoordinateDisplay } from "./CoordinateDisplay";
import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

describe("CoordinateDisplay render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const wrapper = shallow(
            <CoordinateDisplay
                coordinates={{ lat: 0, lng: 0 }}
                displayClassName="latitude-value-container"
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
