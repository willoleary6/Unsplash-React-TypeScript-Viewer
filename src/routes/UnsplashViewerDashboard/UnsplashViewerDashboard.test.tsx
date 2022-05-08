import React from "react";
import { UnsplashViewerDashboard } from "./UnsplashViewerDashboard";
import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { UnsplashViewerState, initialState } from "../../slices/UnsplashViewer/slice";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
interface mockStoreInterface {
    unsplash: UnsplashViewerState;
}
const mockStore = configureStore<
    mockStoreInterface,
    ThunkDispatch<mockStoreInterface, unknown, AnyAction>
>(middlewares);

describe("GalleryModal render testing", () => {
    let store = mockStore();

    it("renders and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        // using mount here instead of shallow because we want to render the child components too
        const mockState: mockStoreInterface = {
            unsplash: { ...initialState, searchStatus: "Idle" },
        };
        store = mockStore(mockState);
        const wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>
                    <UnsplashViewerDashboard />
                </Provider>
            </React.StrictMode>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders and takes snapshot to track jsx element changes, should render the loading animation", () => {
        const mockState: mockStoreInterface = {
            unsplash: { ...initialState, searchStatus: "In Progress" },
        };
        store = mockStore(mockState);
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>
                    <UnsplashViewerDashboard />
                </Provider>
            </React.StrictMode>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders and takes snapshot to track jsx element changes, should render the gallery component", () => {
        const mockState: mockStoreInterface = {
            unsplash: { ...initialState, searchStatus: "Success" },
        };
        store = mockStore(mockState);
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>
                    <UnsplashViewerDashboard />
                </Provider>
            </React.StrictMode>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders and takes snapshot to track jsx element changes, should render the Error message ", () => {
        const mockState: mockStoreInterface = {
            unsplash: { ...initialState, searchStatus: "Error" },
        };
        store = mockStore(mockState);
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>
                    <UnsplashViewerDashboard />
                </Provider>
            </React.StrictMode>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders and takes snapshot to track jsx element changes, should render the All results displayed image", () => {
        const mockState: mockStoreInterface = {
            unsplash: { ...initialState, searchStatus: "All results retrieved" },
        };
        store = mockStore(mockState);
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>
                    <UnsplashViewerDashboard />
                </Provider>
            </React.StrictMode>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders and takes snapshot to track jsx element changes, should render the No Results message", () => {
        const mockState: mockStoreInterface = {
            unsplash: { ...initialState, searchStatus: "No Results" },
        };
        store = mockStore(mockState);
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>
                    <UnsplashViewerDashboard />
                </Provider>
            </React.StrictMode>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
