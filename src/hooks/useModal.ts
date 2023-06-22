import React, { useState } from "react";

export const useModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    const handleClose = () => {
        setShowModal(!showModal);
    };

    return { showModal, handleClose };
};