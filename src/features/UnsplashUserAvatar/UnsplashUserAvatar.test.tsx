import React from "react";
import { UnsplashUserAvatar } from "./UnsplashUserAvatar";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("SearchStatusBox render testing", () => {
    it("renders panel and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        const wrapper = shallow(
            <UnsplashUserAvatar username="test" profileLink="test" profileImageUrl="test" />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
