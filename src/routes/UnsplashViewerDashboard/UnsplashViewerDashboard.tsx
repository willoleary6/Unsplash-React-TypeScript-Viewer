import React from "react";
import { searchUnsplashData } from "../../slices/UnsplashViewer/thunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUnsplashSearchStatus } from "../../slices/UnsplashViewer/selectors";
import { updateSearchQuery } from "../../slices/UnsplashViewer/slice";
import { SearchBar } from "../../features/SearchBar";

import { LoadingSpinner } from "../../features/LoadingSpinner";
import { Gallery } from "../../features/Gallery";
import { SearchStatusBox } from "../../features/SearchStatusBox";

export function UnsplashViewerDashboard(): JSX.Element {
    const searchStatus = useAppSelector(selectUnsplashSearchStatus);
    const dispatch = useAppDispatch();

    const searchExecution = (searchInput: string) => {
        dispatch(updateSearchQuery(searchInput));
        dispatch(searchUnsplashData());
    };

    const StatusMessageToShow = () => {
        switch (searchStatus) {
            case "All results retrieved":
                return <SearchStatusBox messageToDisplay="All results retrieved" isError={false} />;
            case "No Results":
                return (
                    <SearchStatusBox
                        messageToDisplay="Unable to find any images for that query"
                        isError={false}
                    />
                );
            case "In Progress":
                return <LoadingSpinner />;
            case "Error":
                return (
                    <SearchStatusBox messageToDisplay="Something went wrong...." isError={true} />
                );
            default:
                return (
                    <SearchStatusBox
                        messageToDisplay="Search and view a gallery of images provided by Unsplash"
                        isError={false}
                    />
                );
        }
    };
    return (
        <>
            {/* Wrap it in a dummy jsx parent */}
            <div className="row">
                <div className="col-lg-4 mt-5"></div>
                <div className="col-lg-4 mt-5">
                    <SearchBar executeSearchFunction={searchExecution} />
                </div>
                <div className="col-lg-4 mt-5"></div>
            </div>
            <Gallery />
            {StatusMessageToShow()}
        </>
    );
}
