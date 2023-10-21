import * as Yup from "yup";

export const validationSchemaArticuloManufacturado = (id: number) => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),
        denominacion: Yup.string()
            .required('La Denominación es requerida')
            .trim(),
        descripcion: Yup.string()
            .nullable(),
        bloqueado: Yup.boolean()
            .nullable(),
        imagen: id === 0
            ? Yup.string()
                .required('La Imagen es requerida')
                .trim()
            : Yup.string()
                .nullable(),
        precioVenta: Yup.number()
            .required('El Precio de Venta es requerido')
            .positive('El Precio de Venta debe ser un valor positivo'),
        rubro: Yup.object().shape({
            id: Yup.number()
                .integer()
                .min(0),
            denominacion: Yup.string()
                .required('La denominación es requerida')
                .trim(),
            bloqueado: Yup.boolean()
                .nullable(),
            esInsumo: Yup.boolean()
                .nullable()
        }),
        receta: Yup.string()
            .nullable(),
        tiempoEstimadoCocina: Yup.string()
            .required('El Tiempo Estimado en Cocina es requerido')
            .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Formato inválido. Debe ser HH:mm:ss')
            .trim(),
        detalles: Yup.array()
            .min(1, 'Debe agregar al menos un Ingrediente')
            .of(Yup.object({
                id: Yup.number()
                    .integer()
                    .min(0),
                cantidad: Yup.number()
                    .positive('La Cantidad debe ser un valor positivo')
                    .required('La Cantidad es requerida'),
                articuloInsumo: Yup.object().shape({
                    id: Yup.number()
                        .integer()
                        .min(0),
                    denominacion: Yup.string()
                        .required('La Denominación es requerida')
                        .trim(),
                })
            }))
    });
};