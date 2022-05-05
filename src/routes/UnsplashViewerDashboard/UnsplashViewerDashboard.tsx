import React, { useState } from "react";
import { searchUnsplashData } from "../../slices/UnsplashViewer/thunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUnsplashSearchResults } from "../../slices/UnsplashViewer/selectors";
import { UnsplashApiSearchResult } from "../../slices/UnsplashViewer/slice";
import { SearchBar } from "../../features/SearchBar";
import { GalleryTile } from "../../features/GalleryTile";
import { GalleryModal } from "../../features/GalleryModal";
export function UnsplashViewerDashboard(): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const searchResults = useAppSelector(selectUnsplashSearchResults);
    const onButtonClick = (searchInput: string) => {
        dispatch(searchUnsplashData(searchInput));
    };

    return (
        <>
            {/* Wrap it in a dummy jsx parent */}
            <div className="row">
                <div className="col-lg-4 mt-5"></div>
                <div className="col-lg-4 mt-5">
                    <SearchBar executeSearchFunction={onButtonClick} />
                </div>
                <div className="col-lg-4 mt-5"></div>
            </div>

            <section className="overflow-hidden text-gray-700 ">
                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                    <div className="flex flex-wrap -m-1 md:-m-2">
                        {searchResults.map((searchResult: UnsplashApiSearchResult) => (
                            <GalleryTile
                                key={searchResult.id}
                                imageSearchResult={searchResult}
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        ))}
                    </div>
                </div>
                <GalleryModal showModal={showModal} setShowModal={setShowModal} />
            </section>
        </>
    );
}
