import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import GeoMapSlice from "../slices/GeoMap/GeoMapSlice";
import unsplashViewer from "../slices/UnsplashViewer/slice";
export const store = configureStore({
    reducer: {
        geoMap: GeoMapSlice,
        unsplash: unsplashViewer,
    },
    middleware: (getDefaultMiddleware) => {
        return [...getDefaultMiddleware()];
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
