import React, { useEffect, useState } from "react";
import { searchUnsplashData } from "../../slices/UnsplashViewer/thunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUnsplashSearchResults } from "../../slices/UnsplashViewer/selectors";
import {
    incrementCurrentResultPage,
    UnsplashApiSearchResult,
    updateSearchQuery,
} from "../../slices/UnsplashViewer/slice";
import { SearchBar } from "../../features/SearchBar";
import { GalleryTile } from "../../features/GalleryTile";
import { GalleryModal } from "../../features/GalleryModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "../../features/LoadingSpinner";

export function UnsplashViewerDashboard(): JSX.Element {
    const [showModal, setShowModal] = useState(false);

    const [hasMore, setHasMore] = useState(false);
    const searchResults = useAppSelector(selectUnsplashSearchResults);
    const [infiniteScrollLength, setInfiniteScrollLength] = useState(10);

    const [viewableImages, setViewableImages] = useState(
        searchResults.slice(0, infiniteScrollLength)
    );

    useEffect(() => {
        fetchMoreData();
    }, [searchResults]);

    useEffect(() => {
        setViewableImages(searchResults.slice(0, infiniteScrollLength));
    }, [infiniteScrollLength, searchResults]);

    const fetchMoreData = () => {
        let listIncrementSize = 10;
        if (searchResults.length > viewableImages.length) {
            if (searchResults.length - viewableImages.length < infiniteScrollLength) {
                listIncrementSize = searchResults.length - viewableImages.length;
            }
            setInfiniteScrollLength(infiniteScrollLength + listIncrementSize);
            setHasMore(true);
        } else if (searchResults.length !== 0) {
            setHasMore(false);
            dispatch(incrementCurrentResultPage());
            dispatch(searchUnsplashData());
        }
    };

    const dispatch = useAppDispatch();

    const searchExecution = (searchInput: string) => {
        dispatch(updateSearchQuery(searchInput));
        dispatch(searchUnsplashData());
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
            <div className=" overflow-hidden flex flex-col"></div>
            <section className="overflow-hidden text-gray-700 ">
                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                    <InfiniteScroll
                        className="flex flex-wrap -m-1 md:-m-2 overflow-hidden "
                        dataLength={viewableImages.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<LoadingSpinner />}
                    >
                        {viewableImages.map((searchResult: UnsplashApiSearchResult) => (
                            <GalleryTile
                                key={searchResult.id} // issue here with the keys, need to have only unique photos
                                imageSearchResult={searchResult}
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        ))}
                    </InfiniteScroll>
                </div>
                <GalleryModal showModal={showModal} setShowModal={setShowModal} />
            </section>
        </>
    );
}
