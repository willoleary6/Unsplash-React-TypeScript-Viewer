import React, { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

interface GalleryImageProps {
    sourceUrl: string;
}

export const GalleryImage = ({ sourceUrl }: GalleryImageProps): JSX.Element => {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            {loaded ? null : <LoadingSpinner />}
            <div className={loaded ? "" : "hidden"}>
                <img
                    alt="gallery"
                    className="block p-1 md:p-2 object-cover object-center w-full h-full rounded-lg"
                    src={sourceUrl}
                    onLoad={() => setLoaded(true)}
                />
            </div>
        </>
    );
};
