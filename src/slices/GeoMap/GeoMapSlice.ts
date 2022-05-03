import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import osmtogeojson from "osmtogeojson";

export interface coordinates {
    lat: number;
    lng: number;
}

export interface GeoMapState {
    canInduceMapMovements: boolean;
    centreCoordinates: coordinates;
    northWestCoordinates: coordinates;
    northEastCoordinates: coordinates;
    southWestCoordinates: coordinates;
    southEastCoordinates: coordinates;
    // forced to use an any here as typescript really struggles with the GeoJson types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geoJsonData: any;
}

export const initialState: GeoMapState = {
    canInduceMapMovements: true,
    centreCoordinates: { lat: 46.81914, lng: 9.62556 },
    northWestCoordinates: { lat: 0, lng: 0 },
    northEastCoordinates: { lat: 0, lng: 0 },
    southWestCoordinates: { lat: 0, lng: 0 },
    southEastCoordinates: { lat: 0, lng: 0 },

    geoJsonData: null,
};

export const fetchOpenStreetData = createAsyncThunk(
    "geoMap/fetchOpenStreetData",
    async (_args: void, { getState }) => {
        const state = getState() as { geoMap: GeoMapState };
        const left = state.geoMap.northWestCoordinates.lng.toString();
        const bottom = state.geoMap.southWestCoordinates.lat.toString();
        const right = state.geoMap.northEastCoordinates.lng.toString();
        const top = state.geoMap.northEastCoordinates.lat.toString();
        const url =
            "https://www.openstreetmap.org/api/0.6/map?bbox=" +
            left +
            "," +
            bottom +
            "," +
            right +
            "," +
            top;
        const response = await fetch(url, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.text();
            })
            .catch(() => {
                return null;
            });

        if (response != null) {
            const parsedOsmData = new DOMParser().parseFromString(response, "application/xml");
            return osmtogeojson(parsedOsmData).features;
        }
        return null;
    }
);

export const geoMapSlice = createSlice({
    name: "GeoMap",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateCentreCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.centreCoordinates = action.payload;
        },
        updateNorthWestCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.northWestCoordinates = action.payload;
        },
        updateNorthEastCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.northEastCoordinates = action.payload;
        },
        updateSouthWestCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.southWestCoordinates = action.payload;
        },
        updateSouthEastCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.southEastCoordinates = action.payload;
        },
        disableReduxInducedMapMovements: (GeoMapState) => {
            GeoMapState.canInduceMapMovements = false;
        },
        enableReduxInducedMapMovements: (GeoMapState) => {
            GeoMapState.canInduceMapMovements = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOpenStreetData.fulfilled, (GeoMapState, action) => {
            GeoMapState.geoJsonData = action.payload;
        });
    },
});

export const {
    updateCentreCoordinates,
    updateNorthEastCoordinates,
    updateNorthWestCoordinates,
    updateSouthEastCoordinates,
    updateSouthWestCoordinates,
    disableReduxInducedMapMovements,
    enableReduxInducedMapMovements,
} = geoMapSlice.actions;

export const selectGeoMap = (state: RootState): GeoMapState => state.geoMap;

export default geoMapSlice.reducer;
