import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { GalleryTile } from "../../features/GalleryTile";
import { GalleryModal } from "../../features/GalleryModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectUnsplashSearchResults,
    selectUnsplashSearchStatus,
} from "../../slices/UnsplashViewer/selectors";
import {
    incrementCurrentResultPage,
    UnsplashApiSearchResult,
} from "../../slices/UnsplashViewer/slice";
import { searchUnsplashData } from "../../slices/UnsplashViewer/thunks";

export const Gallery = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const searchStatus = useAppSelector(selectUnsplashSearchStatus);
    const searchResults = useAppSelector(selectUnsplashSearchResults);
    const [showModal, setShowModal] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [infiniteScrollLength, setInfiniteScrollLength] = useState(10);
    const [viewableImages, setViewableImages] = useState(
        searchResults.slice(0, infiniteScrollLength)
    );

    useEffect(() => {
        fetchMoreData();
    }, [searchResults]);

    useEffect(() => {
        if (searchStatus === "Success") {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [searchStatus]);

    const fetchMoreData = () => {
        let listIncrementSize = 10;
        if (searchResults.length > viewableImages.length) {
            if (searchResults.length - viewableImages.length < infiniteScrollLength) {
                listIncrementSize = searchResults.length - viewableImages.length;
            }
            setInfiniteScrollLength(infiniteScrollLength + listIncrementSize);
            setViewableImages(searchResults.slice(0, infiniteScrollLength));
        } else if (searchResults.length !== 0) {
            dispatch(incrementCurrentResultPage());
            dispatch(searchUnsplashData());
        } else {
            setInfiniteScrollLength(10);
            setViewableImages([]);
        }
    };

    return (
        <section className="overflow-hidden text-gray-700  flex flex-col">
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
    );
};
