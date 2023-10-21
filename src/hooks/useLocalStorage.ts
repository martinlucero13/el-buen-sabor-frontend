import { useEffect, useState } from "react"

/**
 * Hook personalizado que permite almacenar y acceder a valores en el almacenamiento local del navegador.
 * @param key - La clave utilizada para almacenar el valor en el almacenamiento local.
 * @param initialValue - El valor inicial que se utilizará si no se encuentra ningún valor almacenado.
 * @return { Array } - Una tupla que contiene el valor actual y una función para actualizar ese valor.
 */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}