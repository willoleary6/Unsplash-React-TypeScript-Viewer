import { createSlice } from "@reduxjs/toolkit";

export interface UnsplashViewerState {
    apiRequestInProgress: boolean;
}

export const initialState: UnsplashViewerState = {
    apiRequestInProgress: false,
};

export const unsplashViewer = createSlice({
    name: "UnsplashViewer",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
});

export const {} = unsplashViewer.actions;

export default unsplashViewer.reducer;
