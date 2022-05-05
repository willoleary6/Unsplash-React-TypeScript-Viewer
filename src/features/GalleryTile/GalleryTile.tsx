import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { UnsplashApiSearchResult, updateSelectedPhoto } from "../../slices/UnsplashViewer/slice";
import { GalleryImage } from "../GalleryImage";

interface GalleryTileProps {
    imageSearchResult: UnsplashApiSearchResult;
    showModal: boolean;
    setShowModal: (setShowModal: boolean) => void;
}

export const GalleryTile = ({
    imageSearchResult,
    showModal,
    setShowModal,
}: GalleryTileProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const onGalleryImageClick = () => {
        dispatch(updateSelectedPhoto(imageSearchResult.id));
        setShowModal(!showModal);
    };

    return (
        <>
            <div
                key={imageSearchResult.id}
                className="flex flex-wrap lg:w-1/5
                 md:w-1/3 sm:w-1/2 hover:cursor-pointer"
                onClick={() => onGalleryImageClick()}
            >
                <GalleryImage sourceUrl={imageSearchResult.urls.small} />
            </div>
        </>
    );
};
