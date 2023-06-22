import React, { useState } from "react";

export function useAlert() {
    const [ showAlert, setAlert ] = useState(false);

    const handleAlert = () => {
        setAlert(!showAlert);
    };

    return { showAlert, handleAlert };
}