import { RootState } from "../../app/store";
import { UnsplashViewerState, UnsplashApiSearchResult } from "./slice";

export const selectUnsplashViewer = (state: RootState): UnsplashViewerState => state.unsplash;

export const selectUnsplashSearchResults = (state: RootState): UnsplashApiSearchResult[] =>
    state.unsplash.searchResults;

export const selectUnsplashSearchStatus = (state: RootState): string => state.unsplash.searchStatus;

export const selectGalleryImageForModal = (
    state: RootState
): UnsplashApiSearchResult | undefined => {
    return state.unsplash.searchResults.find((galleryImage: UnsplashApiSearchResult) => {
        return galleryImage.id === state.unsplash.selectedGalleryImageId;
    });
};
