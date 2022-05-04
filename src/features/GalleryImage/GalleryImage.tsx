import React, { useEffect, useState, KeyboardEvent } from "react";
import { UnsplashApiSearchResult } from "../../slices/UnsplashViewer/slice";

interface GalleryImageProps {
    imageSearchResult: UnsplashApiSearchResult;
    showModal: boolean;
    setShowModal: (setShowModal: boolean) => void;
}

export const GalleryImage = ({
    imageSearchResult,
    showModal,
    setShowModal,
}: GalleryImageProps): JSX.Element => {
    return (
        <>
            <div
                key={imageSearchResult.id}
                className="flex flex-wrap w-1/5 hover:cursor-pointer"
                onClick={() => setShowModal(!showModal)}
            >
                <div className="w-full p-1 md:p-2">
                    <img
                        alt="gallery"
                        className="block object-cover object-center w-full h-full rounded-lg"
                        src={imageSearchResult.urls.small}
                    />
                </div>
            </div>
        </>
    );
};
