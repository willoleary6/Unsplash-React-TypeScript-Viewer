import { createAsyncThunk } from "@reduxjs/toolkit";
import { UnsplashViewerState } from "./slice";

export const searchUnsplashData = createAsyncThunk(
    "unsplash/searchUnsplash",
    async (_args: void, { getState }) => {
        const state = getState() as { unsplash: UnsplashViewerState };

        const response = await fetch(
            "https://api.unsplash.com/search/photos?query=" +
                state.unsplash.searchQuery +
                "&client_id=M5VBH_2QX33zPVyoWGvnVmb8zQbcESVOyCqQO185FEk" +
                "&per_page=30" +
                "&page=" +
                state.unsplash.currentResultPage.toString(),
            {
                method: "GET",
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .catch((error) => {
                throw Error(error.message);
            });
        return response;
    }
);
