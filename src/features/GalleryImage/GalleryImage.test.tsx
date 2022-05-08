import React from "react";
import { GalleryImage } from "./GalleryImage";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("GalleryImage render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const wrapper = shallow(
            <GalleryImage sourceUrl="https://images.unsplash.com/photo-1648737963059-59ec8e2d50c5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjU1NzJ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjUxNjA5NTQ4&ixlib=rb-1.2.1&q=85" />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
