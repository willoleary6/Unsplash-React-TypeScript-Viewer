import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchUnsplashData } from "./thunks";

export interface UnsplashViewerState {
    apiRequestInProgress: boolean;
    searchResults: UnsplashApiSearchResult[];
    selectedGalleryImageId: string;
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

export interface UnsplashUser {
    instagram_username: string;
    first_name: string;
    last_name: string;
}

export interface UnsplashApiSearchResult {
    id: string;
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
    apiRequestInProgress: false,
    selectedGalleryImageId: "",
    searchResults: [],
};

export const unsplashViewer = createSlice({
    name: "UnsplashViewer",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateSelectedPhoto: (UnsplashViewerState, action: PayloadAction<string>) => {
            UnsplashViewerState.selectedGalleryImageId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchUnsplashData.fulfilled, (UnsplashViewerState, action) => {
            const payload = action.payload.results;
            UnsplashViewerState.searchResults = payload;
        });
    },
});

export const { updateSelectedPhoto } = unsplashViewer.actions;

export default unsplashViewer.reducer;
