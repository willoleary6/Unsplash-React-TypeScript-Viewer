import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectGalleryImageForModal } from "../../slices/UnsplashViewer/selectors";
import { GalleryImage } from "../GalleryImage";
import { saveAs } from "file-saver";
import { UnsplashUserAvatar } from "../UnsplashUserAvatar";

interface GalleryModalProps {
    showModal: boolean;
    setShowModal: (setShowModal: boolean) => void;
}
export const GalleryModal = ({ showModal, setShowModal }: GalleryModalProps): JSX.Element => {
    const selectedGalleryImage = useAppSelector(selectGalleryImageForModal);
    return showModal && selectedGalleryImage !== undefined ? (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-start justify-start pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <div
                        className="relative inline-block align-center bg-white rounded-lg text-left overflow-hidden 
                                    shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
                            "
                    >
                        <div className=" sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center right-10 rounded-md border border-1 
                                    shadow-sm px-4 py-2 mt-1 text-base font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 
                                    focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setShowModal(!showModal)}
                            >
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white px-4 pt-5 pb-4 col-span-2 sm:p-6 sm:pb-4">
                                <GalleryImage sourceUrl={selectedGalleryImage.urls.regular} />
                            </div>
                            <UnsplashUserAvatar
                                username={selectedGalleryImage.user.username}
                                profileLink={selectedGalleryImage.user.links.html}
                                profileImageUrl={selectedGalleryImage.user.profile_image.large}
                            />
                        </div>
                        {/*
                            Modal Action buttons
                        */}
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() =>
                                    saveAs(
                                        selectedGalleryImage.urls.regular,
                                        Date.now().toString() + ".jpg"
                                    )
                                }
                            >
                                <i className="fa fa-download" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};
