import { useState } from "react";

/**
 * Hook personalizado para manejar el estado de un modal.
 * @returns Un objeto con el estado del modal y una función para invertir el estado.
 */
export const useModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    const handleClose = () => {
        setShowModal(!showModal);
    };

    return { showModal, handleClose };
};