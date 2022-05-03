import { RootState } from "../../app/store";
import { UnsplashViewerState } from "./slice";

export const selectUnsplashViewer = (state: RootState): UnsplashViewerState => state.unsplash;
