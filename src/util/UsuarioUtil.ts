export function isValidateClave(clave: string): boolean {

    if (clave === undefined || clave === null || clave === '') {
        return false;
    }
    if (clave.length < 8) {
        return false;
    }

    const tieneMayuscula = /[A-Z]/.test(clave);
    const tieneMinuscula = /[a-z]/.test(clave);
    const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(clave);

    return tieneMayuscula && tieneMinuscula && tieneSimbolo;
}

export function isEqualPasswords(clave: string, confirmarClave: string): boolean {
    return clave === confirmarClave;
};

export function isValidateString(valor: string): boolean {
    return valor !== undefined && valor !== null && valor.trim() !== '';
}

export function isValidateNumber(valor: number): boolean {
    return valor !== undefined && valor !== null && valor > 0;
}
