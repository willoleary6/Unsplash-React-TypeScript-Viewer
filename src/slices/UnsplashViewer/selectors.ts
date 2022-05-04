import { RootState } from "../../app/store";
import { UnsplashViewerState, UnsplashApiSearchResult } from "./slice";

export const selectUnsplashViewer = (state: RootState): UnsplashViewerState => state.unsplash;

export const selectUnsplashSearchResults = (state: RootState): UnsplashApiSearchResult[] =>
    state.unsplash.searchResults;
