import React from "react";
import { CoordinateInput } from "./CoordinateInput";
import Enzyme, { mount, ReactWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render } from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe("CoordinateInput render testing", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<CoordinateInput searchForCoordinates={() => void 0} />);
    });

    it("simulates user input, missing comma should cause an error message to appear", () => {
        const input = wrapper.find("input");
        input.simulate("change", { target: { value: "1" } });
        // only time we render a <p> is when there is an error
        expect(wrapper.find("p").exists()).toEqual(true);
    });

    it("simulates user input, missing second coordinate should cause an error message to appear", () => {
        const input = wrapper.find("input");
        input.simulate("change", { target: { value: "1," } });
        // only time we render a <p> is when there is an error
        expect(wrapper.find("p").exists()).toEqual(true);
    });
    it("simulates user input, invalid second coordinate should cause an error message to appear", () => {
        const input = wrapper.find("input");
        input.simulate("change", { target: { value: "1,A" } });
        // only time we render a <p> is when there is an error
        expect(wrapper.find("p").exists()).toEqual(true);
    });
    it("simulates user input, invalid first coordinate should cause an error message to appear", () => {
        const input = wrapper.find("input");
        input.simulate("change", { target: { value: "A,1" } });
        // only time we render a <p> is when there is an error
        expect(wrapper.find("p").exists()).toEqual(true);
    });

    it("simulates user input, invalid first coordinate  (out of range) should cause an error message to appear", () => {
        const input = wrapper.find("input");
        input.simulate("change", { target: { value: "145,1" } });
        // only time we render a <p> is when there is an error
        expect(wrapper.find("p").exists()).toEqual(false);
    });
    it("simulates user input, invalid commas should cause an error message to appear", () => {
        const input = wrapper.find("input");
        input.simulate("change", { target: { value: "14,,1" } });
        // only time we render a <p> is when there is an error
        expect(wrapper.find("p").exists()).toEqual(true);
    });

    it("simulates user input, invalid second coordinate (out of range) should cause an error message to appear", () => {
        const input = wrapper.find("input");
        input.simulate("change", { target: { value: "1,-900" } });
        // only time we render a <p> is when there is an error
        expect(wrapper.find("p").exists()).toEqual(true);
    });
});
