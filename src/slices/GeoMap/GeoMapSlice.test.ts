import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import reducer, {
    initialState,
    GeoMapState,
    updateCentreCoordinates,
    updateNorthWestCoordinates,
    updateNorthEastCoordinates,
    updateSouthWestCoordinates,
    updateSouthEastCoordinates,
    disableReduxInducedMapMovements,
    enableReduxInducedMapMovements,
    fetchOpenStreetData,
} from "./GeoMapSlice";

const middlewares = [thunk];
interface mockStoreInterface {
    geoMap: GeoMapState;
}
const mockStore = configureStore<
    mockStoreInterface,
    ThunkDispatch<mockStoreInterface, unknown, AnyAction>
>(middlewares);

describe("Testing the reducers", () => {
    // set up a fake store for all our tests
    let store = mockStore();
    beforeEach(() => {
        const mockState: mockStoreInterface = { geoMap: initialState };

        store = mockStore(mockState);
    });
    afterEach(() => {
        store.clearActions();
    });

    it("tests that the default values for the map on open are as expected", () => {
        const state = store.getState().geoMap;
        const centreCoordinates = state.centreCoordinates;
        expect(centreCoordinates?.lat).toBe(46.81914);
        expect(centreCoordinates?.lng).toBe(9.62556);
    });

    it("tests to see if centre coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateCentreCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            centreCoordinates: newCoordinates,
        });
    });

    it("tests to see if north west coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateNorthWestCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            northWestCoordinates: newCoordinates,
        });
    });

    it("tests to see if north east coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateNorthEastCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            northEastCoordinates: newCoordinates,
        });
    });

    it("tests to see if south west coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateSouthWestCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            southWestCoordinates: newCoordinates,
        });
    });

    it("tests to see if south east coordinates reducer is working as expected", () => {
        const newCoordinates = {
            lat: 0,
            lng: 0,
        };
        expect(
            reducer(initialState, {
                type: updateSouthEastCoordinates,
                payload: newCoordinates,
            })
        ).toEqual({
            ...initialState,
            southEastCoordinates: newCoordinates,
        });
    });

    it("tests to see if disabling the map movements is working as expected", () => {
        expect(
            reducer(initialState, {
                type: disableReduxInducedMapMovements,
            })
        ).toEqual({
            ...initialState,
            canInduceMapMovements: false,
        });
    });

    it("tests to see if enabling the map movements is working as expected", () => {
        expect(
            reducer(initialState, {
                type: enableReduxInducedMapMovements,
            })
        ).toEqual({
            ...initialState,
            canInduceMapMovements: true,
        });
    });
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ ok: true, text: () => "" }),
    })
) as jest.Mock;

describe("Testing the fetchOpenStreetData thunk", () => {
    // set up a fake store for all our tests
    let store = mockStore();
    beforeEach(() => {
        const mockState: mockStoreInterface = {
            geoMap: {
                canInduceMapMovements: true,
                centreCoordinates: {
                    lat: 46.81914,
                    lng: 9.62556,
                },
                northWestCoordinates: {
                    lat: 46.825817382887145,
                    lng: 9.613208770751955,
                },
                northEastCoordinates: {
                    lat: 46.825817382887145,
                    lng: 9.637928009033205,
                },
                southWestCoordinates: {
                    lat: 46.81245534135787,
                    lng: 9.613208770751955,
                },
                southEastCoordinates: {
                    lat: 46.81245534135787,
                    lng: 9.637928009033205,
                },
                geoJsonData: [],
            },
        };
        store = mockStore(mockState);
    });
    afterEach(() => {
        store.clearActions();
    });

    it("tests triggering the fetchOpenStreetData thunk and checking a fetch request was mate  ", async () => {
        // first testing that the thunk execution exits successfully
        await store.dispatch(fetchOpenStreetData());
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("handles exception with null", async () => {
        const mockFetchPromise = Promise.reject(
            () =>
                "You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm"
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalRef: any = global;
        globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        // first testing that the thunk execution exits successfully
        const test = await store.dispatch(fetchOpenStreetData());

        expect(test.payload).toEqual(null);
    });

    it("handles exception with null", async () => {
        const mockFetchPromise = Promise.reject(
            () =>
                "You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm"
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalRef: any = global;
        globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        // first testing that the thunk execution exits successfully
        const test = await store.dispatch(fetchOpenStreetData());

        expect(test.payload).toEqual(null);
    });

    it("handles valid osm data", async () => {
        const mockSuccessResponse =
            '<?xml version="1.0" encoding="UTF-8"?> \
        <osm version="0.6" generator="CGImap 0.8.6 (1416373 spike-07.openstreetmap.org)" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">\
            <bounds minlat="52.3559488" minlon="-9.7169351" maxlat="52.3574395" maxlon="-9.7138452"/>\
            <node id="2251306398" visible="true" version="1" changeset="15625969" timestamp="2013-04-05T22:20:40Z" user="mapryan" uid="51469" lat="52.3545897" lon="-9.7222203"/>\
            <way id="923136531" visible="true" version="1" changeset="101881651" timestamp="2021-03-28T16:45:08Z" user="eireidium" uid="146307">\
                <nd ref="8569466237"/>\
                <nd ref="8569466238"/>\
                <nd ref="8569466239"/>\
                <nd ref="8569466240"/>\
                <nd ref="8569466237"/>\
                <tag k="building" v="shed"/>\
            </way>\
            <relation id="10788035" visible="true" version="49" changeset="116046554" timestamp="2022-01-12T01:54:04Z" user="MacLondon" uid="322039">\
                <member type="relation" ref="13643256" role=""/>\
                <member type="relation" ref="12885714" role=""/>\
                <member type="relation" ref="13502160" role="future"/>\
                <member type="relation" ref="13519014" role="future"/>\
                <member type="relation" ref="13519015" role="future"/>\
                <member type="relation" ref="13502161" role="future"/>\
                <tag k="colour" v="#003399"/>\
                <tag k="name" v="EuroVelo 1 - Atlantic Coast Route - Kerry"/>\
                <tag k="name:en" v="EuroVelo 1 - Atlantic Coast Route - Kerry"/>\
                <tag k="network" v="icn"/>\
                <tag k="ref" v="EV1"/>\
                <tag k="route" v="bicycle"/>\
                <tag k="type" v="superroute"/>\
            </relation>\
        </osm>';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            ok: true,
            text: () => mockJsonPromise,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalRef: any = global;
        globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        // first testing that the thunk execution exits successfully
        const test = await store.dispatch(fetchOpenStreetData());

        expect(test.payload).toEqual(undefined);
    });

    it("handles valid osm data but ok is false, should throw and error and return null", async () => {
        const mockSuccessResponse =
            '<?xml version="1.0" encoding="UTF-8"?> \
        <osm version="0.6" generator="CGImap 0.8.6 (1416373 spike-07.openstreetmap.org)" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">\
            <bounds minlat="52.3559488" minlon="-9.7169351" maxlat="52.3574395" maxlon="-9.7138452"/>\
            <node id="2251306398" visible="true" version="1" changeset="15625969" timestamp="2013-04-05T22:20:40Z" user="mapryan" uid="51469" lat="52.3545897" lon="-9.7222203"/>\
            <way id="923136531" visible="true" version="1" changeset="101881651" timestamp="2021-03-28T16:45:08Z" user="eireidium" uid="146307">\
                <nd ref="8569466237"/>\
                <nd ref="8569466238"/>\
                <nd ref="8569466239"/>\
                <nd ref="8569466240"/>\
                <nd ref="8569466237"/>\
                <tag k="building" v="shed"/>\
            </way>\
            <relation id="10788035" visible="true" version="49" changeset="116046554" timestamp="2022-01-12T01:54:04Z" user="MacLondon" uid="322039">\
                <member type="relation" ref="13643256" role=""/>\
                <member type="relation" ref="12885714" role=""/>\
                <member type="relation" ref="13502160" role="future"/>\
                <member type="relation" ref="13519014" role="future"/>\
                <member type="relation" ref="13519015" role="future"/>\
                <member type="relation" ref="13502161" role="future"/>\
                <tag k="colour" v="#003399"/>\
                <tag k="name" v="EuroVelo 1 - Atlantic Coast Route - Kerry"/>\
                <tag k="name:en" v="EuroVelo 1 - Atlantic Coast Route - Kerry"/>\
                <tag k="network" v="icn"/>\
                <tag k="ref" v="EV1"/>\
                <tag k="route" v="bicycle"/>\
                <tag k="type" v="superroute"/>\
            </relation>\
        </osm>';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            ok: false,
            text: () => mockJsonPromise,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalRef: any = global;
        globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        // first testing that the thunk execution exits successfully
        const test = await store.dispatch(fetchOpenStreetData());

        expect(test.payload).toEqual(null);
    });
});

describe("Testing how the reducer handles thunks", () => {
    // set up a fake store for all our tests
    let store = mockStore();
    beforeEach(() => {
        const mockState: mockStoreInterface = {
            geoMap: {
                canInduceMapMovements: true,
                centreCoordinates: {
                    lat: 46.81914,
                    lng: 9.62556,
                },
                northWestCoordinates: {
                    lat: 46.825817382887145,
                    lng: 9.613208770751955,
                },
                northEastCoordinates: {
                    lat: 46.825817382887145,
                    lng: 9.637928009033205,
                },
                southWestCoordinates: {
                    lat: 46.81245534135787,
                    lng: 9.613208770751955,
                },
                southEastCoordinates: {
                    lat: 46.81245534135787,
                    lng: 9.637928009033205,
                },
                geoJsonData: [],
            },
        };
        store = mockStore(mockState);
    });
    afterEach(() => {
        store.clearActions();
    });

    it("handles valid osm data but ok is false, should throw and error and return null", async () => {
        const sampleJson = [
            {
                test: true,
            },
        ];

        const action = { type: fetchOpenStreetData.fulfilled.type, payload: sampleJson };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            geoJsonData: sampleJson,
        });
    });
});
/*
  // next we need to test how the reducer handles a success message from the thunk
        
*/
