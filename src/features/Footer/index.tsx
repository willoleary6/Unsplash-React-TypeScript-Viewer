import React from "react";
import "./footer.css";

export const Footer = (): JSX.Element => {
    return (
        <>
            <div className=" w-full bg-gray-700 text-gray-200 shadow-inner">
                <div>Unsplash Viewer - {new Date().getFullYear()}</div>
            </div>
        </>
    );
};
