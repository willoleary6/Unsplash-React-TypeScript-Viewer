import React from "react";

import { TrinityRingsSpinner } from "react-epic-spinners";

export const LoadingSpinner = (): JSX.Element => {
    return (
        <>
            <TrinityRingsSpinner color="#1ab394" className="mx-auto"></TrinityRingsSpinner>
        </>
    );
};
