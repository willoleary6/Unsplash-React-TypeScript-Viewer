import React from "react";

interface UnsplashUserAvatarProps {
    username: string;
    profileLink: string;
    profileImageUrl: string;
}

export const UnsplashUserAvatar = ({
    username,
    profileLink,
    profileImageUrl,
}: UnsplashUserAvatarProps): JSX.Element => {
    return (
        <div
            className=" bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 col-span-1 flex flex-col hover:cursor-pointer"
            onClick={() => window.open(profileLink, "_blank")}
        >
            <img
                alt="gallery"
                className="inline object-cover w-16 h-16 mr-2 rounded-full justify-center"
                src={profileImageUrl}
            />
            <p className="justify-center">{username}</p>
        </div>
    );
};
