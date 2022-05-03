import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchUnsplashData = createAsyncThunk("unsplash/searchUnsplash", async () => {
    console.log("hello world!");

    const response = await fetch(
        "https://api.unsplash.com/search/photos?query=office&client_id=M5VBH_2QX33zPVyoWGvnVmb8zQbcESVOyCqQO185FEk",
        {
            method: "GET",
        }
    )
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.text();
        })
        .catch(() => {
            return null;
        });
    console.log(response);
});
