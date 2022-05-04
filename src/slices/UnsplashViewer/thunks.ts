import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchUnsplashData = createAsyncThunk(
    "unsplash/searchUnsplash",
    async (searchInput: string) => {
        const response = await fetch(
            "https://api.unsplash.com/search/photos?query=" +
                searchInput +
                "&client_id=M5VBH_2QX33zPVyoWGvnVmb8zQbcESVOyCqQO185FEk",
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
            .catch(() => {
                return null;
            });
        return response;
    }
);
