import React from "react";
interface SearchStatusBoxProps {
    messageToDisplay: string;
    isError: boolean;
}

export const SearchStatusBox = ({
    messageToDisplay,
    isError,
}: SearchStatusBoxProps): JSX.Element => {
    if (!isError) {
        return (
            <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32 text-center bg-gray-300">
                <p>{messageToDisplay}</p>
            </div>
        );
    } else {
        return (
            <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
                role="alert"
            >
                <span className="block sm:inline">{messageToDisplay}</span>
            </div>
        );
    }
};
