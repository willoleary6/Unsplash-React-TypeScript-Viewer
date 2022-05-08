import React from "react";
import { Gallery } from "./Gallery";
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

describe("Gallery render testing", () => {
    let store = mockStore();
    beforeEach(() => {
        const sampleImageResult = {
            id: "8rS5UgAc5iw",
            created_at: "2022-03-31T10:47:51-04:00",
            updated_at: "2022-05-03T11:38:02-04:00",
            color: "#d9d9d9",
            description: null,
            alt_description: null,
            urls: {
                raw: "https://images.unsplash.com/photo-1648737963059-59ec8e2d50c5?ixid=MnwzMjU1NzJ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjUxNjA5NTQ4&ixlib=rb-1.2.1",
                full: "https://images.unsplash.com/photo-1648737963059-59ec8e2d50c5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjU1NzJ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjUxNjA5NTQ4&ixlib=rb-1.2.1&q=85",
                regular:
                    "https://images.unsplash.com/photo-1648737963059-59ec8e2d50c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjU1NzJ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjUxNjA5NTQ4&ixlib=rb-1.2.1&q=80&w=1080",
                small: "https://images.unsplash.com/photo-1648737963059-59ec8e2d50c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjU1NzJ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjUxNjA5NTQ4&ixlib=rb-1.2.1&q=80&w=400",
                thumb: "https://images.unsplash.com/photo-1648737963059-59ec8e2d50c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjU1NzJ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjUxNjA5NTQ4&ixlib=rb-1.2.1&q=80&w=200",
                small_s3:
                    "https://s3.us-west-2.amazonaws.com/images.unsplash.com/photo-1648737963059-59ec8e2d50c5",
            },
            links: {
                self: "https://api.unsplash.com/photos/8rS5UgAc5iw",
                html: "https://unsplash.com/photos/8rS5UgAc5iw",
                download:
                    "https://unsplash.com/photos/8rS5UgAc5iw/download?ixid=MnwzMjU1NzJ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjUxNjA5NTQ4",
                download_location:
                    "https://api.unsplash.com/photos/8rS5UgAc5iw/download?ixid=MnwzMjU1NzJ8MXwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjUxNjA5NTQ4",
            },
            likes: 48,
            liked_by_user: false,
            user: {
                username: "surface",
                links: {
                    html: "https://unsplash.com/@surface",
                },
                profile_image: {
                    small: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                    medium: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                    large: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128",
                },
                instagram_username: "surface",
            },
        };
        const mockState: mockStoreInterface = {
            unsplash: { ...initialState, searchResults: [sampleImageResult] },
        };
        store = mockStore(mockState);
    });
    it("renders and takes snapshot to track jsx element changes, will also test for exceptions in element code", () => {
        // using mount here instead of shallow because we want to render the child components too
        const wrapper = mount(
            <React.StrictMode>
                <Provider store={store}>
                    <Gallery />
                </Provider>
            </React.StrictMode>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
