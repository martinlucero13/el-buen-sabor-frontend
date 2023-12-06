import { useState } from "react";

/**
 * Hook personalizado para controlar la recarga de datos.
 * @returns Un objeto que contiene el estado de recarga y una función para manejar la recarga.
 */
export const useReload = () => {
    const [reload, setReload] = useState<boolean>(false);

    const handleReload = () => {
        setReload(!reload);
    };

    return { reload, handleReload };
};