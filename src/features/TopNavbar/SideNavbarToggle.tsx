import React, { useRef } from "react";
export const SideNavbarToggle = (): JSX.Element => {
    const body = useRef(document.getElementsByTagName("body")[0]);
    // default keep it closed
    body.current.classList.add("mini-navbar");
    const toggleSideNavbar = () => {
        body.current.classList.toggle("mini-navbar");
    };
    return (
        <a
            id="side-navbar-toggle"
            className="  btn btn-primary"
            onClick={toggleSideNavbar}
            href="#"
        >
            <i className="fa fa-bars fa-lg"></i>
        </a>
    );
};
