import React from "react";
import { searchUnsplashData } from "../../slices/UnsplashViewer/thunks";
import { useAppDispatch } from "../../app/hooks";
export function UnsplashViewerDashboard(): JSX.Element {
    const dispatch = useAppDispatch();

    const onButtonClick = () => {
        dispatch(searchUnsplashData());
    };

    return (
        <>
            {/* Wrap it in a dummy jsx parent */}
            <div className="row">
                <div className="col-lg-4 mt-5"></div>
                <div className="col-lg-4 mt-5">
                    <button onClick={onButtonClick}>Test</button>
                </div>
                <div className="col-lg-4 mt-5"></div>
            </div>
        </>
    );
}
