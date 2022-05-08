import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { initialState, UnsplashViewerState } from "./slice";
import { searchUnsplashData } from "./thunks";

const middlewares = [thunk];
interface mockStoreInterface {
    unsplash: UnsplashViewerState;
}
const mockStore = configureStore<
    mockStoreInterface,
    ThunkDispatch<mockStoreInterface, unknown, AnyAction>
>(middlewares);

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ ok: true, text: () => "" }),
    })
) as jest.Mock;

describe("Testing the searchUnsplashData thunk", () => {
    // set up a fake store for all our tests
    let store = mockStore();
    beforeEach(() => {
        const mockState: mockStoreInterface = {
            unsplash: {
                ...initialState,
                searchQuery: "test",
            },
        };
        store = mockStore(mockState);
    });
    afterEach(() => {
        store.clearActions();
    });

    it("tests triggering the searchUnsplashData thunk and checking a fetch request was made  ", async () => {
        // first testing that the thunk execution exits successfully
        await store.dispatch(searchUnsplashData());
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("handles exception with error", async () => {
        const mockFetchPromise = Promise.reject(() => "failed");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalRef: any = global;
        globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        // first testing that the thunk execution exits successfully
        const test = await store.dispatch(searchUnsplashData());

        expect(test.payload).toEqual(undefined);
    });

    it("handles valid response from api", async () => {
        const mockSuccessResponse = {
            total: 10004,
            total_pages: 1001,
            results: [
                {
                    id: "8rS5UgAc5iw",
                    created_at: "2022-03-31T10:47:51-04:00",
                    updated_at: "2022-05-03T11:38:02-04:00",
                    promoted_at: null,
                    width: 8256,
                    height: 5504,
                    color: "#d9d9d9",
                    blur_hash: "LPNTq4bb?btQ_NM{M{IUM{oJITjZ",
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
                    categories: [],
                    likes: 48,
                    liked_by_user: false,
                    current_user_collections: [],
                    sponsorship: {
                        impression_urls: [
                            "https://secure.insightexpressai.com/adServer/adServerESI.aspx?script=false&bannerID=10307226&rnd=[timestamp]&redir=https://secure.insightexpressai.com/adserver/1pixel.gif",
                        ],
                        tagline: "Original by design",
                        tagline_url:
                            "https://www.microsoft.com/surface?ocid=UnsplashFY22_soc_pmc_sur_",
                        sponsor: {
                            id: "N-JSeSTCz68",
                            updated_at: "2022-05-03T16:19:31-04:00",
                            username: "surface",
                            name: "Surface",
                            first_name: "Surface",
                            last_name: null,
                            twitter_username: "surface",
                            portfolio_url: "http://surface.com",
                            bio: "Follow us @Surface. #OriginalByDesign",
                            location: null,
                            links: {
                                self: "https://api.unsplash.com/users/surface",
                                html: "https://unsplash.com/@surface",
                                photos: "https://api.unsplash.com/users/surface/photos",
                                likes: "https://api.unsplash.com/users/surface/likes",
                                portfolio: "https://api.unsplash.com/users/surface/portfolio",
                                following: "https://api.unsplash.com/users/surface/following",
                                followers: "https://api.unsplash.com/users/surface/followers",
                            },
                            profile_image: {
                                small: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                                medium: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                                large: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128",
                            },
                            instagram_username: "surface",
                            total_collections: 6,
                            total_likes: 0,
                            total_photos: 256,
                            accepted_tos: true,
                            for_hire: false,
                            social: {
                                instagram_username: "surface",
                                portfolio_url: "http://surface.com",
                                twitter_username: "surface",
                                paypal_email: null,
                            },
                        },
                    },
                    topic_submissions: {},
                    user: {
                        id: "N-JSeSTCz68",
                        updated_at: "2022-05-03T16:19:31-04:00",
                        username: "surface",
                        name: "Surface",
                        first_name: "Surface",
                        last_name: null,
                        twitter_username: "surface",
                        portfolio_url: "http://surface.com",
                        bio: "Follow us @Surface. #OriginalByDesign",
                        location: null,
                        links: {
                            self: "https://api.unsplash.com/users/surface",
                            html: "https://unsplash.com/@surface",
                            photos: "https://api.unsplash.com/users/surface/photos",
                            likes: "https://api.unsplash.com/users/surface/likes",
                            portfolio: "https://api.unsplash.com/users/surface/portfolio",
                            following: "https://api.unsplash.com/users/surface/following",
                            followers: "https://api.unsplash.com/users/surface/followers",
                        },
                        profile_image: {
                            small: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
                            medium: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
                            large: "https://images.unsplash.com/profile-1587651800415-20eed2ec0209image?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128",
                        },
                        instagram_username: "surface",
                        total_collections: 6,
                        total_likes: 0,
                        total_photos: 256,
                        accepted_tos: true,
                        for_hire: false,
                        social: {
                            instagram_username: "surface",
                            portfolio_url: "http://surface.com",
                            twitter_username: "surface",
                            paypal_email: null,
                        },
                    },
                    tags: [],
                },
            ],
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            ok: true,
            text: () => mockJsonPromise,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalRef: any = global;
        globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        // first testing that the thunk execution exits successfully
        const test = await store.dispatch(searchUnsplashData());

        expect(test.payload).toEqual(undefined);
    });
});
