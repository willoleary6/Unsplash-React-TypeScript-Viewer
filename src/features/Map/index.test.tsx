import React from "react";
import { Map } from ".";
import Enzyme, { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import reducer, { GeoMapState, initialState } from "../../slices/GeoMap/GeoMapSlice";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
interface mockStoreInterface {
    geoMap: GeoMapState;
}
const mockStore = configureStore<
    mockStoreInterface,
    ThunkDispatch<mockStoreInterface, unknown, AnyAction>
>(middlewares);

describe("MapWidget render testing", () => {
    let store = mockStore();
    beforeEach(() => {
        const mockState: mockStoreInterface = { geoMap: initialState };

        store = mockStore(mockState);
    });
    it("renders and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>
                    <Map />
                </Provider>
            </React.StrictMode>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
