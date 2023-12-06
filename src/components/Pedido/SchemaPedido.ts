import * as Yup from "yup";

export const validationSchemaPedido = (id: number) => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),

        domicilio: Yup.object().shape({
            id: Yup.number()
                .integer()
                .min(0),
            calle: Yup.string()
                .required('La Calle es requerida'),
            numero: Yup.number()
                .required('El Número es requerido')
                .positive('El Número debe ser un número positivo')
                .min(0, 'El Número debe ser un número positivo'),
            localidad: Yup.object().shape({
                id: Yup.number()
                    .integer()
                    .min(0),
                nombre: Yup.string()
                    .required('La Localidad es requerida')
                    .trim()
            })
        })
    })
};