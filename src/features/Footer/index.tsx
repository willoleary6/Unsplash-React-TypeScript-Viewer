import React from "react";
import "./footer.css";

export const Footer = (): JSX.Element => {
    return (
        <>
            <div className="footer-spacer">
                {/*
                This div is here simply to take up space at the bottom of the page so
                that the footer does not overlap with page content.
                */}
            </div>
            <div className="footer">
                <div>Unsplash Viewer</div>
            </div>
        </>
    );
};
