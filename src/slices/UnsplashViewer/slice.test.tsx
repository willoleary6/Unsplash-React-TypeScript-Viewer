import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import reducer, {
    incrementCurrentResultPage,
    initialState,
    UnsplashViewerState,
    updateSearchQuery,
    updateSelectedPhoto,
} from "./slice";
import { searchUnsplashData } from "./thunks";

const middlewares = [thunk];
interface mockStoreInterface {
    unsplash: UnsplashViewerState;
}
const mockStore = configureStore<
    mockStoreInterface,
    ThunkDispatch<mockStoreInterface, unknown, AnyAction>
>(middlewares);

describe("Testing the reducers", () => {
    // set up a fake store for all our tests
    let store = mockStore();
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
    beforeEach(() => {
        const mockState: mockStoreInterface = { unsplash: initialState };

        store = mockStore(mockState);
    });
    afterEach(() => {
        store.clearActions();
    });

    it("test that the default values are as expect", () => {
        const state = store.getState().unsplash;
        const selectedGalleryImageId = state.selectedGalleryImageId;
        const searchResults = state.searchResults;
        const searchQuery = state.selectedGalleryImageId;
        const currentResultPage = state.currentResultPage;
        const searchStatus = state.searchStatus;
        expect(selectedGalleryImageId).toBe("");
        expect(searchResults.length).toBe(0);
        expect(searchQuery).toBe("");
        expect(currentResultPage).toBe(1);
        expect(searchStatus).toBe("Idle");
    });

    it("tests to see if updateSelectedPhoto reducer is working correctly ", () => {
        const newId = "test";
        expect(
            reducer(initialState, {
                type: updateSelectedPhoto,
                payload: newId,
            })
        ).toEqual({
            ...initialState,
            selectedGalleryImageId: newId,
        });
    });
    it("tests to see if updateSearchQuery reducer is working correctly ", () => {
        const newSearchQuery = "test";
        expect(
            reducer(initialState, {
                type: updateSearchQuery,
                payload: newSearchQuery,
            })
        ).toEqual({
            ...initialState,
            searchQuery: newSearchQuery,
            currentResultPage: 1,
            searchResults: [],
        });
    });
    it("tests to see if incrementCurrentResultPage reducer is working correctly ", () => {
        expect(
            reducer(initialState, {
                type: incrementCurrentResultPage,
            })
        ).toEqual({
            ...initialState,
            currentResultPage: 2,
        });
    });

    it("tests to see if searchUnsplashData.pending reducer is working correctly ", () => {
        expect(
            reducer(initialState, {
                type: searchUnsplashData.pending,
            })
        ).toEqual({
            ...initialState,
            searchStatus: "In Progress",
        });
    });

    it("tests to see if searchUnsplashData.rejected reducer is working correctly ", () => {
        expect(
            reducer(initialState, {
                type: searchUnsplashData.rejected,
            })
        ).toEqual({
            ...initialState,
            searchStatus: "Error",
        });
    });

    it("tests to see if searchUnsplashData.fulfilled reducer is working correctly with a valid data", () => {
        const reducerExecution = reducer(initialState, {
            type: searchUnsplashData.fulfilled,
            payload: {
                results: [sampleImageResult],
            },
        });
        expect(reducerExecution.searchStatus).toEqual("Success");
        expect(reducerExecution.searchResults.length).toEqual(1);
    });

    it("tests to see if searchUnsplashData.fulfilled reducer is working correctly with a empty data", () => {
        const reducerExecution = reducer(initialState, {
            type: searchUnsplashData.fulfilled,
            payload: {
                results: [],
            },
        });
        expect(reducerExecution.searchStatus).toEqual("No Results");
        expect(reducerExecution.searchResults.length).toEqual(0);
    });

    it("tests to see if searchUnsplashData.fulfilled reducer is working correctly with an end of results scenario data", () => {
        const reducerExecution = reducer(
            { ...initialState, searchResults: [sampleImageResult] },
            {
                type: searchUnsplashData.fulfilled,
                payload: {
                    results: [],
                },
            }
        );
        expect(reducerExecution.searchStatus).toEqual("All results retrieved");
        expect(reducerExecution.searchResults.length).toEqual(1);
    });

    it("tests to see if searchUnsplashData.fulfilled reducer is working correctly with no results", () => {
        const reducerExecution = reducer(initialState, {
            type: searchUnsplashData.fulfilled,
            payload: {},
        });
        expect(reducerExecution.searchStatus).toEqual("Error");
        expect(reducerExecution.searchResults.length).toEqual(0);
    });
});
