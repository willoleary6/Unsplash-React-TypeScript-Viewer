import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchUnsplashData } from "./thunks";
export interface UnsplashViewerState {
    searchResults: UnsplashApiSearchResult[];
    selectedGalleryImageId: string;
    searchQuery: string;
    currentResultPage: number;
    searchStatus:
        | "Idle"
        | "In Progress"
        | "Success"
        | "Error"
        | "No Results"
        | "All results retrieved";
}

export interface UnsplashDownloadLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

export interface UnsplashImageLinks {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
}
export interface UnsplashUserLinks {
    html: string;
}
export interface UnsplashUserProfileImages {
    small: string;
    medium: string;
    large: string;
}
export interface UnsplashUser {
    instagram_username: string;
    username: string;
    links: UnsplashUserLinks;
    profile_image: UnsplashUserProfileImages;
}

export interface UnsplashApiSearchResult {
    id: string;
    description: null | string;
    alt_description: null | string;
    color: string;
    created_at: string;
    updated_at: string;
    liked_by_user: boolean;
    likes: number;
    links: UnsplashDownloadLinks;
    urls: UnsplashImageLinks;
    user: UnsplashUser;
}

export const initialState: UnsplashViewerState = {
    selectedGalleryImageId: "",
    searchResults: [],
    searchQuery: "",
    currentResultPage: 1,
    searchStatus: "Idle",
};

export const unsplashViewer = createSlice({
    name: "UnsplashViewer",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateSelectedPhoto: (UnsplashViewerState, action: PayloadAction<string>) => {
            UnsplashViewerState.selectedGalleryImageId = action.payload;
        },
        updateSearchQuery: (UnsplashViewerState, action: PayloadAction<string>) => {
            UnsplashViewerState.searchQuery = action.payload;
            UnsplashViewerState.currentResultPage = 1;
            UnsplashViewerState.searchResults = []; // clear the existing results
        },
        incrementCurrentResultPage: (UnsplashViewerState) => {
            UnsplashViewerState.currentResultPage++;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchUnsplashData.fulfilled, (UnsplashViewerState, action) => {
            if (
                action.payload.hasOwnProperty("results") &&
                action.payload.results.constructor.name === "Array"
            ) {
                const results = action.payload.results;
                // To ensure the app is running fluidly, we need to ensure the elements we supply to the react dom
                // have unique key values, I have noticed that we have repeated usage of the ids inbetween search queries
                // if there is a conflict between the keys, this will hurt both reacts performance and will throw some exceptions
                // solution then must be to take the timestamp at which this query results have been received and append this timestamp
                // to the end of each of the images id field.
                let epochTimeStampIdDifferentiator = Math.random();
                const resultsWithDifferentiatedIds = [];
                results.forEach((searchResult: UnsplashApiSearchResult) => {
                    searchResult.id += "-" + epochTimeStampIdDifferentiator;
                    // incrementing the differentiator just to be safe that we dont have to of the same ids
                    // in the same query result
                    epochTimeStampIdDifferentiator++;
                    resultsWithDifferentiatedIds.push(searchResult);
                });
                UnsplashViewerState.searchResults =
                    UnsplashViewerState.searchResults.concat(results);

                if (UnsplashViewerState.searchResults.length > 0) {
                    if (results.length > 0) {
                        UnsplashViewerState.searchStatus = "Success";
                    } else {
                        // we've retrieved all the results from the api, nothing else to retrieve
                        UnsplashViewerState.searchStatus = "All results retrieved";
                    }
                } else {
                    // only going to trigger this status when we have received absolutely no data from
                    // this query, ending
                    UnsplashViewerState.searchStatus = "No Results";
                    UnsplashViewerState.searchResults = [];
                }
            } else {
                UnsplashViewerState.searchStatus = "Error";
                UnsplashViewerState.searchResults = [];
            }
        }),
            builder.addCase(searchUnsplashData.pending, (UnsplashViewerState) => {
                UnsplashViewerState.searchStatus = "In Progress";
            });
        builder.addCase(searchUnsplashData.rejected, (UnsplashViewerState) => {
            UnsplashViewerState.searchStatus = "Error";
            UnsplashViewerState.searchResults = [];
        });
    },
});

export const { updateSelectedPhoto, updateSearchQuery, incrementCurrentResultPage } =
    unsplashViewer.actions;

export default unsplashViewer.reducer;
